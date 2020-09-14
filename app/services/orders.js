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
  async find (params = {}) {
    const { fromUserId, perPage, page } = params

    const orders = await Order.find({ fromUserId })
      .limit(perPage)
      .skip(page * perPage)
    return orders
  }

  /**
   * 更新订单
   * @param {String} id 订单id
   * @param {Object} params 查询参数
   */
  async update (id, params) {
    const order = await Order.findByIdAndUpdate(id, params, { new: true })
    return order
  }
}

module.exports = new OrdersServ()
