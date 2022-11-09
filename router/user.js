let express = require('express')
let router = express.Router()
let expressjoi = require('@escook/express-joi')
let {rules} = require('../schema/user')

//导入处理函数
let userHandle = require('../router_handler/user')


//监听注册功能
// 3.2 express(rules)数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post('/register',expressjoi(rules),userHandle.register)

//监听登录功能
router.post('/login',userHandle.login)

module.exports = router