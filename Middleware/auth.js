const {getUser} = require("../Utils/JWT")
function authen(req,res,next){
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            message: "Failed", 
            data: "No token provided or invalid format" 
        });
    }
    const token = authHeader.split(' ')[1]
    if(!token) res.json({message : "Failed", data :"Invalid email or  password"})
    const payload = getUser(token)
    if(!payload) res.json({message : "Failed", data : "Unauthentic User"})
        req.user = payload
    next()

}

module.exports = authen