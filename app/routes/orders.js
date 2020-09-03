/**
 * @description order router
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/orders' })
const { sendCard } = require('../controllers/orders')
const { genValidator } = require('../middlewares/validator')
const orderValidate = require('../validators/orders')

router.use(genValidator(orderValidate))
router.post('/', sendCard)

module.exports = router