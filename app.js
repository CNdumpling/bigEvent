let express = require('express')
let app = express()

let joi = require('joi')
let config = require('./config')
let expressJWT = require('express-jwt')

let cors = require('cors')
app.use(cors())
//中间件解析token，并用unless()指定哪些接口不需要解析
app.use(expressJWT({secret: config.jwtScretKey}).unless({path:[/^\/api\//]}) )  

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({extended: false}))
//在路由之前封装函数
app.use((req,res,next)=>{
    res.cc = function(err,status=1){
        res.send({
            status,
            message: err instanceof Error?err.message:err  //判断err是是对象还是字符串，是对象返回出错信息，是字符串直接返回字符串
        })
    }
    next()
})


let userRouter = require('./router/user')
app.use('/api',userRouter)

app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError) return res.cc('joi验证发现错误')

    if(err.name === 'UnauthorizedError') return res.cc('token认证失败')
    res.cc('other mistake')
})



app.listen(3007,() => {
    console.log('server is started，running at http://127.0.0.1:3007')
})