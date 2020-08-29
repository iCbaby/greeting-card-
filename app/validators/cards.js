/**
 * @description greeting-card 数据格式校验
 * @author iC
 */

const validate = require('./validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      maxLength: 255,
      minLength: 1
    },
    value: {
      type: 'number',
      minimum: 0,
      maximum: 999
    },
    description: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function cardValidate (data = {}) {
  return validate(SCHEMA, data)
}

module.exports = cardValidate
