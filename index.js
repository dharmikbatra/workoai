const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 3000
const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false,
    // useUnifiedTopology: true,
    // autoIndex: true,
}).then(con => {
    console.log("DB connection Successful !")
})


const server = app.listen(port , () => {
    console.log(`application started on port:${port}`)
})

