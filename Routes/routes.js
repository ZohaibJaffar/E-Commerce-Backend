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
const {
    PostOrder,
    GetAllOrder,
    GetSingleOrder,
    PatchOrder
} = require('../Controllers/order.js')
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
routes.get("/user/:url",authen,handleUser)
routes.patch("/user/:url",authen,RoleBase("Admin","Manager","User"),patchHandleUser)
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
//++++++++++++++++++++++++++++++++++++++++++++++++++Orders and Payments routes+++++++++++++++++++++++++++++++++++++++++++
routes.post('/products/:url/order',authen,PostOrder)
routes.get('/orders',authen,RoleBase('Admin',"Manager","User"),GetAllOrder)
routes.get('/orders/:url',authen,RoleBase('Admin','Manager'),GetSingleOrder)
routes.patch('/order/:url',authen,RoleBase('Admin','Manager'),PatchOrder)



module.exports = routes