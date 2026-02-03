const express = require('express')

const routes = express.Router()
const {handlePostLoginRoutes,
    handlePostRegistration,
    handleGetLogin,
    handleGetResgistration,
    handleUser,
    handleAllAuth
}= require("../Controllers/authentication.js")
const  {GetAllProduct,
    PostNewProduct,
    GetNewProduct,
    PostHandleCategory,
    
} = require("../Controllers/Products.js")
const authen = require("../Middleware/auth.js")
const RoleBase = require("../Middleware/role.js")


//++++++++++++++++++++++++++++++++++++User Routes+++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++ Authorization & authentication Routes ++++++++++++++++++++++++++++++++++++
routes.get("/admin/",(req,res)=>{
    res.status(200).json({message : "succeed", data : "Wellcome in our home page "})
})

//login routes
routes.get("/admin/login",handleGetLogin)
routes.post('/admin/login',handlePostLoginRoutes)
//registration
routes.get("/admin/signup",authen,RoleBase("Admin"),handleGetResgistration)
routes.post("/admin/signup",authen,RoleBase("Admin"),handlePostRegistration)
routes.get("/admin/alluser",authen,RoleBase("Admin"),handleAllAuth)
//Individual admin routes
routes.get("/admin/alluser/:url",authen,handleUser)
routes.patch("/admin/alluser/:url",authen,handleUser)
//++++++++++++++++++++++++++++++++Products Routes +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
routes.get('/',GetAllProduct)
routes.post('/product',authen,RoleBase("Admin","Manager"),PostNewProduct)
routes.get("/product",GetNewProduct )
//++++++++++++++++++++++++++++++++++++++++++++Category Routes+++++++++++++++++++++++++++++++++++++++++++++++++++
routes.post("/category",PostHandleCategory)
routes.get("/category",(req,res)=>{
    res.status(200).json({
        status : "Success",
        message : "You are in Category page"
    })
})





module.exports = routes