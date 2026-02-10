const jwt = require("jsonwebtoken")
private_key = process.env.PRIVATE_KEY

function setUser(data){
    const payload = {
        userName : data.userName,
        role : data.role,
        slug : data.slug,
        isActive : data.isActive
    }
    const token = jwt.sign(payload,private_key,{expiresIn : "1h"})
    return token
}
function getUser(token) {
    try {
        const payload = jwt.verify(token,private_key)
        return payload
        
        
    } catch (error) {
        return null 
    }
    
} 

module.exports = {setUser,getUser}