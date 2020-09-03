/**
 * @description user router
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/users' })
const { login, findUser } = require('../controllers/users')
const { genValidator } = require('../middlewares/validator')
const userValidate = require('../validators/users')

router.use(genValidator(userValidate))
router.get('/', findUser)
router.post('/login', login)
// router.get('/', findUsers)
// router.get('/:id', findUserById)

module.exports = router
