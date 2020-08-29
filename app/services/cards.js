/**
 * @description card service
 * @author iC
 */

const Card = require('../models/cards')

class CardsServ {
  /**
   * 注册
   * @param {Object} params 用户信息
   */
  async create (params) {
    const card = await new Card(params).save()
    return card
  }

  /**
   * 查找用户特定
   * @param {Object} params 查询条件
   */
  async findOne (params) {
    const user = await Card.findOne(params)
    return user
  }

  /**
   * 查找用户列表
   * @param {Object} params 查询条件
   */
  async find (params) {
    const { perPage, page, name } = params
    const users = await Card.find({ name: new RegExp(name) })
      .limit(perPage)
      .skip(page * perPage)
    return users
  }
}

module.exports = new CardsServ()
