require("dotenv").config({paht : "./.env"})
const express = require('express')
const routes = require("./Routes/routes.js")
const DBconnection = require("./Config/DBconnection.js")

const app = express()

DBconnection(process.env.MONGO_URL)

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/api/v1/",routes)

app.listen(PORT,()=>{
    console.log(`Sever is started at PORT ${PORT}`)
})