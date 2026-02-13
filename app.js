require("dotenv").config({paht : "./.env"})
const express = require('express')
const routes = require("./Routes/routes.js")
const DBconnection = require("./Config/DBconnection.js")
const  CustomeError = require("./Utils/CustomeError.js")
const GlobalErrorHandler = require('./Middleware/globalErrorHandler.js')

const app = express()

DBconnection(process.env.MONGO_URL)

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/api/v1/",routes)
app.use((req, res,next) => {
    const err = new CustomeError("404:page not found",404)
    next(err)
});
app.use(GlobalErrorHandler)
app.listen(PORT,()=>{
    console.log(`Sever is started at PORT ${PORT}`)
})
