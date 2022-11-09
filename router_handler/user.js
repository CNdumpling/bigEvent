let db = require('../db/index')
let bcryct = require('bcryptjs')
let jwt = require('jsonwebtoken')
let config = require('../config')

exports.register = (req,res) => {
    //获取信息
    const userinfo = req.body
    // console.log("🚀 ~ file: user.js ~ line 4 ~ userinfo", userinfo)
    // res.send('register ok')
    //合法性校验,后端不能相信前端提交的数据
    // if(!userinfo.username || !userinfo.password){
    //     return res.send({status:1,message:'用户名或密码不符合规范'})
    // }
    const sql = 'select * from ev_users where username=?'
    db.query(sql,userinfo.username,(err,results)=>{
        if(err){
            // return res.send({status:1,message:'数据库查找错误'})
            return res.cc(err)
        }
        if(results.length >=1){
            // return res.send({status:1,message:'此用户名已存在,请换一个'})
            return res.cc('用户名已存在')
        }
        //对密码进行加密,参数10提高安全性
        userinfo.password = bcryct.hashSync(userinfo.password,10)
        // console.log("🚀 ~ file: user.js ~ line 23 ~ db.query ~ userinfo", userinfo)
        let sql1 = 'insert into ev_users set ?'
        db.query(sql1,{username : userinfo.username , password : userinfo.password},(err,results)=>{
            if(err){
                // return res.send({status:1,msg:'数据库插入数据失败'})
                return res.cc(err)
            }
            if(results.affectedRows != 1){
                // return res.send({status:1,msg:'注册失败'})
                return res.cc('注册失败')
            }
            //注册成功
            // res.send({status:0,msg:'注册成功'})
            res.cc('注册成功',0)
        })
    })
}

exports.login = (req,res) => {
    let userinfo = req.body
    const sql = 'select * from ev_users where username = ?'
    db.query(sql,userinfo.username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length != 1) return res.cc('登陆失败')
        //比较传来的密码和数据库中的密码是否一样
        const comparePass = bcryct.compareSync(userinfo.password,results[0])
        if(!comparePass) return res.cc('密码错误')
        //登录成功，生成token
        //核心：通过 ES6 的高级语法，快速剔除 密码 和 头像 的值，目的是为了保证用户信息的安全性
        const user = {...userinfo,password:'',user_pic:''}
        //生成token字符串
        
    })
}