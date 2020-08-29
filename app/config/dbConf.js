/**
 * @description mongo数据库配置
 * @author iC
 */

const connectionStr =
  'mongodb+srv://iCbaby:456123Ab13@cluster0.bppbk.mongodb.net/Cluster0?retryWrites=true&w=majority'

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}

module.exports = {
  connectionStr,
  mongoConfig
}
