/**
 * @description order service
 * @author iC
 */

const Order = require('../models/orders')

class OrdersServ {
  /**
   * 新建订单
   * @param {Object} userInfo 用户信息
   */
  async create (params) {
    const order = await new Order(params).save()
    return order
  }

  /**
   * 查找订单
   * @param {Object} params 查询条件
   */
  async find (params) {
    const order = await Order.find()
    return order
  }
}

module.exports = new OrdersServ()
