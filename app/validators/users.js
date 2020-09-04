/**
 * @description user 数据格式校验
 * @author iC
 */

const validate = require('./validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    dingdingNumber: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function userValidate (data = {}) {
  return validate(SCHEMA, data)
}

module.exports = userValidate
