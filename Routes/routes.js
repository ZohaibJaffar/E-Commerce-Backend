const express = require('express')

const routes = express.Router()
const {handlePostLoginRoutes,
    handlePostRegistration,
    handleGetLogin,
    handleGetResgistration,
    handleUser,
    handleAllAuth
}= require("../Controllers/authentication.js")
const authen = require("../Middleware/auth.js")
const RoleBase = require("../Middleware/role.js")


//++++++++++++++++++++++++++++++++++++User Routes+++++++++++++++++++++++++++++++++++
routes.get("/",(req,res)=>{
    res.status(200).json({message : "succeed", data : "Wellcome in our home page "})
})


//++++++++++++++++++++++++++++++++++++ Authorization & authentication Routes ++++++++++++++++++++++++++++++++++++
//login routes
routes.get("/admin/login",handleGetLogin)
routes.post('/admin/login',handlePostLoginRoutes)
//registration
routes.get("/admin/signup",authen,RoleBase("Admin"),handleGetResgistration)
routes.post("/admin/signup",authen,RoleBase("Admin"),handlePostRegistration)
routes.get("/admin/allUser",authen,RoleBase("Admin"),handleAllAuth)
routes.get("/admin/allUser/:name",authen,handleUser)
//++++++++++++++++++++++++++++++++





module.exports = routes