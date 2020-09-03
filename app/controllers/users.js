/**
 * @description user controller
 * @author iC
 */

const { findOne, registerUser, find } = require('../services/users')
const { requiredValidator } = require('../utils/requiredValidator')
const { copyObj } = require('../utils/copyObj')
// const { formatPagination } = require('../utils/pagination')

class UsersCtl {
  /**
   * 登录
   * @param {Object} ctx 上下文
   */
  async login (ctx, next) {
    requiredValidator(
      ['name', 'mobile', 'email', 'department', 'jobNumber', 'costCenter', 'dingdingNumber'],
      ctx
    )

    const { jobNumber } = ctx.request.body
    const user = await findOne({ jobNumber })
    if (user) {
      console.log('已有')
      ctx.body = user
    } else {
      const params = copyObj(ctx.request.body)
      params.points = 100
      params.pointsReceived = 0
      params.cardLimit = 2
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
