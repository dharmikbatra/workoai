const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
const User = require('./models/userModel')
const userRouter = require('./routes/userRoutes')
const globalErrorHandler = require('./controllers/errorController')



app.use(express.json({
    limit:'10kb'
}));
app.use(express.urlencoded({extended:true, limit:'10kb'}))

// app.get('/', (req,res) => {
//     res.status(200).json({
//         status:"success",
//         data:"hello world"
//     })
// })

app.use('/worko/user', userRouter);

app.use('*', (req,res) => {
    res.status(404).json({
        status:'Not Found!',
        data:'endpoint is not valid'
    })
})

app.use(globalErrorHandler)


module.exports = app