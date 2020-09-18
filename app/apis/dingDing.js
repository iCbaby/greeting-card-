/**
 * @description api url
 * @author iC
 */

const { getDingToken } = require('../utils/getDingToken')

/**
 * 钉钉 拿userInfo url
 * @param {Object} 参数对象
 */
async function getUserIdUrl (authCode) {
  const token = await getDingToken()
  return `https://oapi.dingtalk.com/user/getuserinfo?access_token=${token}&code=${authCode}`
}

/**
 * 钉钉 拿userInfo url
 * @param {Object} 参数对象
 */
async function getUserInfoUrl (userId) {
  const token = await getDingToken()
  return `https://oapi.dingtalk.com/user/get?access_token=${token}&userid=${userId}`
}

/**
 * 钉钉 拿用户部门信息 url
 * @param {Object} 参数对象
 */
async function getUserDeptUrl (deptId) {
  const token = await getDingToken()
  return `https://oapi.dingtalk.com/department/get?access_token=${token}&id=${deptId}`
}

module.exports = {
  getUserIdUrl,
  getUserInfoUrl,
  getUserDeptUrl
}
