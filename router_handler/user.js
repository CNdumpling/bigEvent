let db = require('../db/index')
let bcryct = require('bcryptjs')

exports.register = function(req,res){
    //获取信息
    let userinfo = req.body
    // console.log("🚀 ~ file: user.js ~ line 4 ~ userinfo", userinfo)
    // res.send('register ok')
    //合法性校验
    if(!userinfo.username || !userinfo.password){
        return res.send({status:1,message:'用户名或密码不符合规范'})
    }
    let sql = 'select * from ev_users where username = ?'
    db.query(sql,[userinfo.username],(err,results)=>{
        if(err){
            return res.send({status:1,message:'数据库查找错误'})
        }
        if(results.lenth >=1){
            return res.send({status:1,message:'此用户名已存在,请换一个'})
        }
        //对密码进行加密,参数10提高安全性
        userinfo.password = bcryct.hashSync(userinfo.password,10)
        // console.log("🚀 ~ file: user.js ~ line 23 ~ db.query ~ userinfo", userinfo)
        let sql1 = 'insert into ev_users set ?'
        db.query(sql1,{username: userinfo.username,password: userinfo.password},(err,results)=>{
            if(err){
                return res.send({status:1,msg:'数据库插入数据失败'})
            }
            if(results.affectedRows != 1){
                return res.send({status:1,msg:'注册失败'})
            }
            //注册成功
            res.send({status:0,msg:'注册成功'})
        })
    })


}

exports.login = (req,res) => {

}