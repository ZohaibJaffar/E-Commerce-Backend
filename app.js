const express = require('express')
const routes = require("./Routes/routes.js")


const app = express()
const PORT = process.env.PORT || 3000

// app.use(json())

app.use("/",routes)

app.listen(PORT,()=>{
    console.log(`Sever is started at PORT ${PORT}`)
})