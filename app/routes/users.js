/**
 * @description user router
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/users' })
const { findOrLoginUser, findUser } = require('../controllers/users')
const { genValidator } = require('../middlewares/validator')
const userValidate = require('../validators/users')

router.use(genValidator(userValidate))
router.get('/', findUser)
router.post('/login', findOrLoginUser)

module.exports = router
