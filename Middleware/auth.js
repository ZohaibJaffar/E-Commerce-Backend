const {getUser} = require("../Utils/JWT")
function authen(req,res,next){
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            message: "Failed", 
            data: "Unauthorize User" 
        });
    }
    const token = authHeader.split(' ')[1]
    if(!token) res.status(401).json({message : "Failed", data :"Unauthorize User"})
    const payload = getUser(token)
    if(!payload) res.status(401).json({status: "Failed", message : "Unauthorize User"})
    req.user = payload
    next()

}

module.exports = authen