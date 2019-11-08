let express = require('express')
let app = express()

let cors = require('cors')
app.use(cors())

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({extended: false}))

let userRouter = require('./router/user')
app.use('/api',userRouter)


app.listen(3007,() => {
    console.log('server is started，running at http://127.0.0.1:3007')
})