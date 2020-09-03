/**
 * @description order service
 * @author iC
 */

const Order = require('../models/users')

class OrdersServ {
  /**
   * 注册
   * @param {Object} userInfo 用户信息
   */
  async registerUser (userInfo) {
    const user = await new Order(userInfo).save()
    return user
  }

  /**
   * 查找用户特定
   * @param {Object} params 查询条件
   */
  async findOne (params) {
    const user = await Order.findOne(params)
    return user
  }

  /**
   * 查找用户列表
   * @param {Object} params 查询条件
   */
  async find (params) {
    const { perPage, page, name } = params
    const users = await Order.find({ name: new RegExp(name) })
      .limit(perPage)
      .skip(page * perPage)
    return users
  }
}

module.exports = new OrdersServ()
