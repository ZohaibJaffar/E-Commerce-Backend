const express = require('express')

const routes = express.Router()
const {handlePostLoginRoutes,
    handlePostRegistration,
    handleGetLogin,
    handleGetResgistration,
    handleUser,
    handleAllAuth
}= require("../Controllers/authentication.js")
const {
    GetHandleCategory,
    PostHandleCategory,
     GetHandleCategoryIndividual,
     DeleteHandleCategoryIndividual,
    PatchtHandleCategoryIndividual
} = require('../Controllers/category.js')
const  {GetAllProduct,
    PostNewProduct
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
routes.get('/products',GetAllProduct)
routes.post('/products',PostNewProduct)
//++++++++++++++++++++++++++++++++++++++++++++Category Routes+++++++++++++++++++++++++++++++++++++++++++++++++++
routes.post("/category",PostHandleCategory)
routes.get("/category",GetHandleCategory)

routes.get("/category/:url", GetHandleCategoryIndividual)
routes.delete("/category/:url", DeleteHandleCategoryIndividual)
routes.patch("/category/:url",PatchtHandleCategoryIndividual)





module.exports = routes