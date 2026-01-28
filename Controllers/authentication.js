const authUser = require("../Model/authorization.js")

async function handlePostLoginRoutes(req,res) {
    const {email, password} = req.body
    const token = await authUser.matchPasswordAndGenerateToken(email,password)
    if(!user){
        res.json({message : "Fail", data:{token : token}})
    }
    res.status(200).json({message : 'Success',data : { token : token}})
}

async function handlePostRegistration(req,res) {
    const {fullName, email, password, role} = req.body
    const newUser = await authUser.create({
        fullName,
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


module.exports = {handlePostLoginRoutes,handlePostRegistration,handleGetLogin,handleGetResgistration}