/**
 * @description index
 * @author iC
 */

const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const { icLogger } = require('./middlewares/logger')
const koaStatic = require('koa-static')
const error = require('koa-json-error')
const mongoose = require('mongoose')
const app = new Koa()
const routing = require('./routes')
const { connectionStr, mongoConfig } = require('./config/dbConf')

// 启动数据库
mongoose.connect(connectionStr, mongoConfig).then(() => console.log('MongoDB 连接成功了！！'))
mongoose.connection.on('error', console.error)

// koa中间件
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  })
)
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'),
      keepExtensions: true
    }
  })
)

app.use(icLogger)

routing(app)

// 启动koa
app.listen(3000, () => console.log('koa启动在 3000 端口了'))
