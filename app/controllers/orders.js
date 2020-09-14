/**
 * @description order controller
 * @author iC
 */

const { create, find, update } = require('../services/orders')
const { requiredValidator } = require('../utils/requiredValidator')
const { enumValidator } = require('../utils/enumValidator')
const {
  //   CANT_SEND_TO_MYSELF,
  //   SEND_WITHOUT_QUOTA,
  //   CARD_VALUE_ERROR,
  CARD_TYPE_ERROR
} = require('../errors/orders')
const { copyObj } = require('../utils/copyObj')
const { formatPagination } = require('../utils/pagination')

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
   * fromUserId查order
   * @param {Object} ctx 上下文
   */
  async findCardsByFromUserId (ctx) {
    const { id } = ctx.params
    // perPage每页几个条目 page当前第几页
    const { perPage, page } = formatPagination(ctx.query)

    const orders = await find({ fromUserId: id, perPage, page })
    ctx.body = orders
  }

  /**
   * toUserId查order
   * @param {Object} ctx 上下文
   */
  async findCardsByToUserId (ctx) {
    const { id } = ctx.params
    // perPage每页几个条目 page当前第几页
    const { perPage, page } = formatPagination(ctx.query)

    const orders = await find({ toUserId: id, perPage, page })
    ctx.body = orders
  }

  /**
   * 发卡
   * @param {Object} ctx 上下文
   */
  async sendCard (ctx) {
    // 校验参数
    requiredValidator(['cardType', 'fromUserId', 'toUserId', 'remark'], ctx)

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
