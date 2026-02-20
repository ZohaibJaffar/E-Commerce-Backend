const {getUser} = require("../Utils/JWT")
function authen(req,res,next){
    let token;
    if(req.cookies && req.cookies.jwt){
        token = req.cookies.jwt
    }
    else if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }
    console.log(token)
    if(!token){
        return res.status(401).json({
            message : "Failed",
            data :"Authentication token missing or invalid"})
        }
    const payload = getUser(token)
    if(!payload){
        return res.status(401).json({
            status: "Failed",
             message : "Invalid or Expired Token"
            })}
    if(payload.isActive === false){
        return res.status(400).json({
            message : "Failed",
            status : "Failed",
            message : "Your account has been suspended"
        })
    }
    req.user = payload
    next()

}

module.exports = authen