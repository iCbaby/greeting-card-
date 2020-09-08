/**
 * @description user service
 * @author iC
 */

const User = require('../models/users')

class UsersServ {
  /**
   * 注册
   * @param {Object} userInfo 用户信息
   */
  async registerUser (userInfo) {
    const user = await new User(userInfo).save()
    return user
  }

  /**
   * 查找用户特定
   * @param {Object} params 查询条件
   */
  async findOne (params) {
    const user = await User.findOne(params)
    return user
  }

  /**
   * 查找用户列表
   * @param {Object} params 查询条件
   */
  async find () {
    const users = await User.find()
    return users
  }

  /**
   * 更新用户
   * @param {Object} query 查询条件
   * @param {Object} params 更新参数件
   */
  async update (query, params) {
    await User.findOneAndUpdate(query, params, { new: true })
  }
}

module.exports = new UsersServ()
