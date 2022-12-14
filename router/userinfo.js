let express = require('express')
let router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')
//导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
let {update_userinfo_schema,update_password_schema} = require('../schema/user')
//获取信息
router.get('/userinfo',userinfo_handler.getUserInfo)
//更新用户信息
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)
//重置密码
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)

module.exports = router