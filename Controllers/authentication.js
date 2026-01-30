const authUser = require("../Model/authorization.js")

async function handlePostLoginRoutes(req,res) {
    try {
        const {email, password} = req.body
        const token = await authUser.matchPasswordAndGenerateToken(email,password)
        res.status(200).json(
            {status : 'Success',
                data : { token : token}
            })
        
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }
}

async function handlePostRegistration(req,res) {
    try {
        const user = req.body
        const {userName , email, password, role}  = req.body
        const newUser = await authUser.create({
            userName,
            email,
            password,
            role
        })
        const userEmail = newUser.email
        const userRole = newUser.role
        res.status(201).json({message : 'Success ', data :{userEmail,userRole}})
    
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }

}

function handleGetLogin(req,res){
    try {
        res.json({message : "Success", date  : "Wellcome in login page"})
    }
     catch (error) {
        res.status(500).json({
            status : "Failed",
            message : error.message
        })  
    }}
function handleGetResgistration(req,res){
    res.json({message : "Success", date  : "Wellcome in Sign up page"})
}

async function handleAllAuth(req,res){
    try {
        const allUsers = await authUser.find({})
        res.status(200).json({message : "Success",data :allUsers})
        
    } catch (error) {
        res.json({
            status : "Failed",
            message : error.message
        })
    }
}

async function handleUser (req,res){
    try {
        const {name} = req.params
        const user = await authUser({fullName : name})
        res.status(200).json({message :"Success",data : user})
        
    } catch (error) {
        res.json({
            status : "Failed",
            message : error.message
        })
    }

}


module.exports = {handlePostLoginRoutes,
    handlePostRegistration,
    handleGetLogin,
    handleGetResgistration,
    handleAllAuth,
    handleUser
}
