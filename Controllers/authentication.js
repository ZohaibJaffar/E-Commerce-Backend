const authUser = require("../Model/authorization.js")

async function handlePostLoginRoutes(req,res) {
    const {email, password} = req.body
    const token = await authUser.matchPasswordAndGenerateToken(email,password)
    if(!token){
        res.json({message : "Fail", data:{token : token}})
    }
    res.status(200).json({message : 'Success',data : { token : token}})
}

async function handlePostRegistration(req,res) {
    const user = req.body
    console.log(user)
    const {userName , email, password, role}  = req.body
    const newUser = await authUser.create({
        userName,
        email,
        password,
        role
    })

    res.status(201).json({message : 'Success ', data :{email,role}})
}


function handleGetLogin(req,res){
    res.json({message : "Success", date  : "Wellcome in login page"})
}


function handleGetResgistration(req,res){
    res.json({message : "Success", date  : "Wellcome in Sign up page"})
}

async function handleAllAuth(req,res){
    const allUsers = await authUser.find({})
    res.status(200).json({message : "Success",data :allUsers})
}

async function handleUser (req,res){
    const {name} = req.params
    const user = await authUser({fullName : name})
    res.status(200).json({message :"Success",data : user})

}


module.exports = {handlePostLoginRoutes,
    handlePostRegistration,
    handleGetLogin,
    handleGetResgistration,
    handleAllAuth,
    handleUser
}
