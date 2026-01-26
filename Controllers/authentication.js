const authUser = require("../Model/authorization.js")

async function handleLoginRoutes(req,res) {
    const {email, password} = req.body
    const token = await authUser.matchPasswordAndGenerateToken(email,password)
    if(!user){
        res.json({message : "Fail", data:{token : token}})
    }
    res.status(200).json({message : 'Success',data : { token : token}})
}

async function handleregistration(req,res) {
    const {fullName, email, password, role} = req.body
    const newUser = await authUser.create({
        fullName,
        email,
        password,
        role
    })

    res.status(201).json({message : 'Success ', data :{email,role}})
}
