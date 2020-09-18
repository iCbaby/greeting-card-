/**
 * @description order controller
 * @author iC
 */

const { create, find, findById, update, countAll } = require('../services/orders')
const { requiredValidator } = require('../utils/requiredValidator')
const { enumValidator } = require('../utils/enumValidator')
const {
  CANT_SEND_TO_MYSELF,
  CARD_TYPE_ERROR,
  CANT_FIND_FROMUSER,
  CANT_FIND_TOUSER
} = require('../errors/orders')
const { copyObj } = require('../utils/copyObj')
const { formatPagination } = require('../utils/pagination')
const { getUserInfo } = require('../utils/getUserInfo')
const { getDingUserDept } = require('../utils/getUserDept')

class OrdersCtl {
  /**
   * 查order
   * @param {Object} ctx 上下文
   */
  async findCards (ctx) {
    const orders = await find()
    ctx.body = orders
  }

  /**
   * 发卡人fromUserId查order
   * @param {Object} ctx 上下文
   */
  async findCardsByFromUserId (ctx) {
    const { id } = ctx.params
    // perPage每页几个条目 page当前第几页
    const { perPage, page } = formatPagination(ctx.query)

    // 拿订单
    const [orders, count] = await Promise.all([
      find({ fromUserId: id, perPage, page }),
      countAll({ fromUserId: id })
    ])

    // 拿收卡用户信息
    const infoAjaxList = orders.map(item => getUserInfo(item.toUserId))
    const infoList = await Promise.all(infoAjaxList)

    // 合并
    const newOrders = orders.map((item, index) => {
      if (infoList[index] && !infoList[index].name) {
        ctx.throw(412, CANT_FIND_TOUSER + ': ' + orders[index]._id)
      }
      item._doc.toUserName = infoList[index].name
      return item
    })

    ctx.body = {
      data: newOrders,
      count
    }
  }

  /**
   * 收卡人toUserId查order
   * @param {Object} ctx 上下文
   */
  async findCardsByToUserId (ctx) {
    const { id } = ctx.params
    // perPage每页几个条目 page当前第几页
    const { perPage, page } = formatPagination(ctx.query)

    // 拿订单
    const [orders, count] = await Promise.all([
      find({ toUserId: id, perPage, page }),
      countAll({ toUserId: id })
    ])

    // 拿发卡用户信息
    const infoAjaxList = orders.map(item => getUserInfo(item.fromUserId))
    const infoList = await Promise.all(infoAjaxList)

    // 合并
    const newOrders = orders.map((item, index) => {
      if (infoList[index] && !infoList[index].name) {
        ctx.throw(412, CANT_FIND_FROMUSER + ': ' + orders[index]._id)
      }
      item._doc.fromUserName = infoList[index].name
      return item
    })

    ctx.body = {
      data: newOrders,
      count
    }
  }

  /**
   * 订单详情
   * @param {Object} ctx 上下文
   */
  async cardDetail (ctx) {
    const order = await findById(ctx.params.id)

    // 拿用户信息
    const { fromUserId, toUserId } = order
    const [fromUser, toUser] = await Promise.all([getUserInfo(fromUserId), getUserInfo(toUserId)])

    // 拿用户部门
    const [fromUserDept, toUserDept] = await Promise.all([
      getDingUserDept(fromUser.department[0]),
      getDingUserDept(toUser.department[0])
    ])

    // 合并
    order._doc.fromUserDept = fromUserDept.name
    order._doc.toUserDept = toUserDept.name
    order._doc.fromUserName = fromUser.name
    order._doc.toUserName = toUser.name

    ctx.body = {
      data: order
    }
  }

  /**
   * 发卡
   * @param {Object} ctx 上下文
   */
  async sendCard (ctx) {
    // 校验参数
    requiredValidator(['cardType', 'fromUserId', 'toUserId', 'remark'], ctx)

    // 校验发卡人和收卡人
    const { fromUserId, toUserId } = ctx.request.body
    if (fromUserId === toUserId) ctx.throw(412, CANT_SEND_TO_MYSELF)

    // 校验cardType enum
    const { cardType } = ctx.request.body
    enumValidator(cardType, ['玩', '美', '赢', '家'], ctx, CARD_TYPE_ERROR)

    create(copyObj(ctx.request.body))
    ctx.status = 204
  }

  /**
   * 标记卡已读
   * @param {Object} ctx 上下文
   */
  async readCard (ctx) {
    const { id } = ctx.params
    const setData = { $set: { isRead: true } }
    update(id, setData)
    ctx.status = 204
  }
}

module.exports = new OrdersCtl()
