/**
 * @description order controller
 * @author iC
 */

const mongoose = require('mongoose')
const { create, find } = require('../services/orders')
const { findOne: findOneUser, registerUser, update: updateUser } = require('../services/users')
const { requiredValidator } = require('../utils/requiredValidator')
const { enumValidator } = require('../utils/enumValidator')
const {
  CANT_SEND_TO_MYSELF,
  SEND_WITHOUT_QUOTA,
  CARD_VALUE_ERROR,
  CARD_TYPE_ERROR
} = require('../errors/orders')
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

    // 校验收发方、卡积分、卡类型
    const { fromUser, toUser, cardType, value } = ctx.request.body
    if (fromUser === toUser) ctx.throw(412, CANT_SEND_TO_MYSELF)
    enumValidator(value, [11, 66, 88], ctx, CARD_VALUE_ERROR)
    enumValidator(cardType, ['玩', '美', '赢', '家'], ctx, CARD_TYPE_ERROR)

    // 检查发送者有没有额度发
    const canSend = await findOneUser({ dingdingNumber: fromUser, ownPoints: { $gte: value } })
    if (!canSend) ctx.throw(412, `${SEND_WITHOUT_QUOTA}(${value}积分卡)`)

    // 创建事务
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // 检查发送者有没有数据
      const recipient = await findOneUser({ dingdingNumber: toUser })
      if (!recipient) {
        const params = {
          dingdingNumber: toUser,
          points: 0
        }
        await registerUser(params)
      }

      const orderParams = copyObj(ctx.request.body)
      await Promise.all([
        create(orderParams),
        updateUser({ dingdingNumber: toUser }, { $inc: { receivedPoints: value } }),
        updateUser({ dingdingNumber: fromUser }, { $inc: { ownPoints: -value } })
      ])

      // 执行事务
      await session.commitTransaction()
      ctx.status = 204
    } catch (error) {
      console.error(error)
      // 中止事务
      await session.abortTransaction()
      ctx.throw(error)
    } finally {
      session.endSession()
    }
  }
}

module.exports = new OrdersCtl()
