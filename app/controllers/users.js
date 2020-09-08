/**
 * @description user controller
 * @author iC
 */

const { findOne, registerUser, find } = require('../services/users')
// const { requiredValidator } = require('../utils/requiredValidator')
// const { copyObj } = require('../utils/copyObj')
// const { formatPagination } = require('../utils/pagination')

class UsersCtl {
  /**
   * 登录
   * @param {Object} ctx 上下文
   */
  async findOrLoginUser (ctx, next) {
    const { dingdingNumber } = ctx.request.body
    // 找用户
    const user = await findOne({ dingdingNumber })
    if (user) {
      ctx.body = user
    } else {
      const params = {
        dingdingNumber,
        ownPoints: 110,
        receivedPoints: 0
      }
      const newUser = await registerUser(params)
      ctx.body = newUser
    }
  }

  /**
   * 查找user
   * @param {Object} ctx 上下文
   */
  async findUser (ctx) {
    const users = await find()
    ctx.body = users
  }
}

module.exports = new UsersCtl()
