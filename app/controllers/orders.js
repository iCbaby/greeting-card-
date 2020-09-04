/**
 * @description order controller
 * @author iC
 */

const { create, find } = require('../services/orders')
const { findOne, registerUser } = require('../services/users')
const { requiredValidator } = require('../utils/requiredValidator')
const { CANT_SEND_TO_MYSELF, SEND_WITHOUT_QUOTA, CARD_VALUE_ERROR } = require('../errors/orders')
const { copyObj } = require('../utils/copyObj')
// const { formatPagination } = require('../utils/pagination')

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
   * 发卡
   * @param {Object} ctx 上下文
   */
  async sendCard (ctx) {
    requiredValidator(['cardType', 'fromUser', 'toUser', 'remark', 'value'], ctx)

    const { fromUser, toUser, value } = ctx.request.body
    if (fromUser === toUser) ctx.throw(412, CANT_SEND_TO_MYSELF)
    if (value !== 11 && value !== 66 && value !== 88) ctx.throw(412, CARD_VALUE_ERROR)

    // 检查发送者有没有额度发
    const sender = await findOne({ dingdingNumber: fromUser })
    if (!sender['cardLimit_' + value]) ctx.throw(412, `${SEND_WITHOUT_QUOTA}(${value}积分卡)`)

    // 检查发送者有没有数据
    const recipient = await findOne({ dingdingNumber: toUser })
    if (!recipient) {
      const params = {
        dingdingNumber: toUser,
        cardLimit_11: 2,
        cardLimit_66: 2,
        cardLimit_88: 2
      }
      await registerUser(params)
    }

    const orderParams = copyObj(ctx.request.body)
    sender['cardLimit_' + value]--
    await Promise.all([create(orderParams), sender.save()])

    ctx.status = 204
  }
}

module.exports = new OrdersCtl()
