const express = require('express')

const routes = express.Router()
const {handlePostLoginRoutes,
    handlePostRegistration,
    handleGetLogin,
    handleGetResgistration
}= require("../Controllers/authentication.js")
const authen = require("../Middleware/auth.js")


//++++++++++++++++++++++++++++++++++++User Routes+++++++++++++++++++++++++++++++++++
routes.get("/",(req,res)=>{
    res.status(200).json({message : "succeed", data : "Wellcome in our home page "})
})


//++++++++++++++++++++++++++++++++++++login and registration routes ++++++++++++++++++++++++++++++++++++
//login routes
routes.get("/login",handleGetLogin)
routes.post('/login',handlePostLoginRoutes)
//registration
routes.get("/signup",handleGetResgistration)
routes.post("/signup",handlePostRegistration)





module.exports = routes