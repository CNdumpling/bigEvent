let joi = require('joi')
// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(4).max(10).required()

const password = joi.string().pattern(/^[\S]{6,12}$/).required()

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 定义验证 avatar 头像的验证规则
const avatar = joi.string().dataUri().required()

// 定义验证注册和登录表单数据的规则对象
exports.rules = {
  body: {
    username,
    password,
  },
}

exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email,
  }
}

exports.update_password_schema = {
  body: {
    oldPWD : password,
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPWD : joi.not(joi.ref('oldPwd')).concat(password),
  }
}
//共享图像验证规则
exports.update_avatar_schema = {
  body: {
    avatar
  }
}