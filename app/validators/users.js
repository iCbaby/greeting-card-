/**
 * @description user 数据格式校验
 * @author iC
 */

const validate = require('./validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 255,
      minLength: 1
    },
    mobile: {
      type: 'string',
      maxLength: 11,
      minLength: 11
    },
    email: {
      type: 'string',
      format: 'email',
      maxLength: 255,
      minLength: 6
    },
    avatarUrl: {
      type: 'string',
      maxLength: 255
    },
    department: {
      type: 'string',
      maxLength: 255
    },
    jobNumber: {
      type: 'string',
      maxLength: 255
    },
    costCenter: {
      type: 'string',
      maxLength: 255
    },
    nickName: {
      type: 'string',
      maxLength: 255
    },
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
