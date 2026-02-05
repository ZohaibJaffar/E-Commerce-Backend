const express = require('express')

const routes = express.Router()
const {handlePostLoginRoutes,
    handlePostRegistration,
    handleGetLogin,
    handleGetResgistration,
    handleUser,
    handleAllAuth,
    patchHandleUser
}= require("../Controllers/User.js")
const {
    GetHandleCategory,
    PostHandleCategory,
     GetHandleCategoryIndividual,
     DeleteHandleCategoryIndividual,
    PatchtHandleCategoryIndividual
} = require('../Controllers/category.js')
const  {GetAllProduct,
    PostNewProduct,
    GetSingleProduct,
    DeleteSingleProduct,
    PatchSingleProduct
} = require("../Controllers/Products.js")
const authen = require("../Middleware/auth.js")
const RoleBase = require("../Middleware/role.js")


//++++++++++++++++++++++++++++++++++++User Routes+++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++ Authorization & authentication Routes ++++++++++++++++++++++++++++++++++++
routes.get("/admin/",(req,res)=>{
    res.status(200).json({message : "succeed", data : "Wellcome in our home page "})
})

//login routes
routes.get("/login",handleGetLogin)
routes.post('/login',handlePostLoginRoutes)
//registration
routes.get("/signup",handleGetResgistration)
routes.post("/signup",handlePostRegistration)
routes.get("/alluser",authen,RoleBase("Admin"),handleAllAuth)
//Individual admin routes
routes.get("/alluser/:url",authen,handleUser)
routes.patch("/alluser/:url",authen,RoleBase("Admin","User"),patchHandleUser)
//++++++++++++++++++++++++++++++++Products Routes +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
routes.get('/products',GetAllProduct)
routes.post('/products',authen,RoleBase("Admin","Manager"),PostNewProduct)
routes.get('/products/:url',GetSingleProduct)
routes.delete('/products/:url',authen,RoleBase("Admin","Manager"),DeleteSingleProduct)
routes.patch('/products/:url',authen,RoleBase("Admin","Manager"),PatchSingleProduct)
//++++++++++++++++++++++++++++++++++++++++++++Category Routes+++++++++++++++++++++++++++++++++++++++++++++++++++
routes.post("/category",authen,RoleBase("Admin","Manager"),PostHandleCategory)
routes.get("/category",GetHandleCategory)
routes.get("/category/:url", GetHandleCategoryIndividual)
routes.delete("/category/:url",authen,RoleBase("Admin","Manager"), DeleteHandleCategoryIndividual)
routes.patch("/category/:url",authen,RoleBase("Admin","Manager"),PatchtHandleCategoryIndividual)





module.exports = routes