/**
 * @description card controller
 * @author iC
 */

const { create, findOne } = require('../services/cards')
const { requiredValidator } = require('../utils/requiredValidator')
const {
  CARDNAME_IS_OCCUPIED
} = require('../errors/cards')

class UsersCtl {
  /**
   * 新建感谢卡
   * @param {Object} ctx 上下文
   */
  async createCard (ctx, next) {
    requiredValidator(['title', 'value'], ctx)
    const { title } = ctx.request.body
    const card = await findOne({ title })
    if (card) ctx.throw(412, CARDNAME_IS_OCCUPIED)

    const newCard = await create(ctx.request.body)
    ctx.body = newCard
  }
}

module.exports = new UsersCtl()
