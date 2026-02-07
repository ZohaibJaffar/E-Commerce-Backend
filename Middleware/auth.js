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
    if(!token){return res.status(401).json({message : "Failed", data :"Unauthorize User"})}
    const payload = getUser(token)
    if(!payload) {return res.status(401).json({status: "Failed", message : "Unauthorize User"})}
    if(payload.isActive === false){
        return res.status(400).json({
            status : "Failed",
            message : "Your account has been suspended"
        })
    }
    req.user = payload
    next()

}

module.exports = authen