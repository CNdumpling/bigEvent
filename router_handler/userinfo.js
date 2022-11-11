//导入数据库模块
let db = require('../db/index')
//导入处理密码的模块
let bcrypt = require('bcryptjs')

//获取信息
exports.getUserInfo = (req,res)=>{
    //根据用户id查找信息，为了防止密码泄露需要排除password
    let sql = 'select id,username,nickname,email,user_pic  from ev_users where id=?'
    db.query(sql,req.user.id,(err,results)=>{
        //执行sql语句失败
        if(err) return res.cc('直接没有查找到')
        
        if(results.length != 1) return res.cc('获取到超过一条信息')
        res.send({
            status:0,
            message:'登陆成功',
            data:results[0]
        })
    })
}

//更新信息,传递请求头Authorization:token值,请求体:id,nickname,email
exports.updateUserInfo =(req,res)=>{
    let sql = 'update ev_users set ? where id =?'
    db.query(sql,[req.body,req.body.id],(err,results)=>{
        if(err) return res.cc('更新无法进行')
        if(results.affectedRows != 1)  return res.cc('更新失败')
        //更新成功
        res.send({
            status:0,
            message:'更新成功',
        })
    })
}

//重置密码
exports.updatePassword = (req,res)=>{
    // res.send('ok')
    let sql = 'select * from ev_users where id=?'
    // return res.cc('ok')
    db.query(sql,req.user.id,(err,results)=>{
        console.log(req.user.id)
        if(err) return res.cc('查数据库失败')
        if(results.length != 1) return res.cc('用户不存在')
        //用户存在
        //判断密码是否准确
        const comparePass = bcrypt.compareSync(req.body.oldPWD,results[0].password)
        if(!comparePass) {
            res.cc('您输入的密码错误,无法修改密码')
        }

       // 对新密码加密存入数据库
        const newPWD = bcrypt.hashSync(req.body.newPWD, 10)
        let sql1 = 'update ev_users set password=? where id=?'
        db.query(sql1,[newPWD,req.user.id],(err,results)=>{
            if(err) return res.cc('重置密码无法进行')
            if(results.affectedRows != 1) return res.cc('重置密码失败')
            //重置成功
            res.cc('重置成功',0)
        })
    })
}

//