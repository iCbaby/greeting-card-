/**
 * @description order router
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/orders' })
const {
  findCards,
  findCardsByFromUserId,
  findCardsByToUserId,
  sendCard,
  readCard
} = require('../controllers/orders')
const { genValidator } = require('../middlewares/validator')
const orderValidate = require('../validators/orders')

router.use(genValidator(orderValidate))
router.get('/', findCards)
router.get('/send/:id', findCardsByFromUserId)
router.get('/receive/:id', findCardsByToUserId)
router.post('/', sendCard)
router.post('/:id', readCard)

module.exports = router
