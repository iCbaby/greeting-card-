/**
 * @description user router
 * @author iC
 */

const Router = require('@koa/router')
const router = new Router({ prefix: '/cards' })
const {
  createCard
} = require('../controllers/cards')
const { genValidator } = require('../middlewares/validator')
const cardValidate = require('../validators/cards')

router.use(genValidator(cardValidate))
router.post('/', createCard)
// router.get('/', findUsers)
// router.get('/:id', findUserById)

module.exports = router
