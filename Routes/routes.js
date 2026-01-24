const express = require('express')

const routes = express.Router()

routes.get("/",(req,res)=>{
    res.status(200).json({message : "succeed", data : "Wellcome in our home page "})
})




module.exports = routes