let express = require('express')
let router = express.Router()

//导入处理函数
let userHandle = require('../router_handler/user')


//监听注册功能
router.post('/register',userHandle.register)

//监听登录功能
router.post('/login',userHandle.login)

module.exports = router