require("dotenv").config({paht : "./.env"})
const express = require('express')
const routes = require("./Routes/routes.js")
const DBconnection = require("./Config/DBconnection.js")
const rateLimit = require("express-rate-limit")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")

const  CustomeError = require("./Utils/CustomeError.js")
const GlobalErrorHandler = require('./Middleware/globalErrorHandler.js')

const app = express()

DBconnection(process.env.MONGO_URL)
const PORT = process.env.PORT || 3000

app.use(helmet())


app.use(xss())
app.use(mongoSanitize())
const limiter = rateLimit({
    windowMs : 60 * 60 * 1000,
    max : 1000,
    message : "Too many request from this IP, please try again after 15 minutes"
})

app.use('/api', limiter)

app.use(express.json({limit : "5mb"}))
app.use(mongoSanitize())
app.use(xss())
app.use(cookieParser())

app.use("/api/v1/",routes)
app.use((req, res,next) => {
    const err = new CustomeError("404:page not found",404)
    next(err)
});
app.use(GlobalErrorHandler)
app.listen(PORT,()=>{
    console.log(`Sever is started at PORT ${PORT}`)
})
