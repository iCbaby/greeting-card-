/**
 * @description order controller
 * @author iC
 */

// const { findOne, registerUser } = require('../services/orders')
const { findOne } = require('../services/users')
const { requiredValidator } = require('../utils/requiredValidator')
const { CANT_SEND_TO_MYSELF } = require('../errors/orders')
// const { copyObj } = require('../utils/copyObj')
// const { formatPagination } = require('../utils/pagination')

class OrdersCtl {
  /**
   * 登录
   * @param {Object} ctx 上下文
   */
  async sendCard (ctx, next) {
    requiredValidator(['cardType', 'fromUser', 'toUser', 'remark'], ctx)

    const { fromUser, toUser } = ctx.request.body
    if (fromUser === toUser) ctx.throw(412, CANT_SEND_TO_MYSELF)
  }
}

module.exports = new OrdersCtl()
