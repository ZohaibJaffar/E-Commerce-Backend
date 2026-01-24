const jwt = require("jsonwebtoken")
private_key = process.env.PRIVATE_KEY

async function setUser(payload){
    const token = jwt.sign(payload,private_key,{expiresIn : "1h"})
    return token
}
async function getUser(token) {
    try {
        const payload = jwt.verify(token,private_key)
        return payload
        
        
    } catch (error) {
       console.log(`There is error while verifying the token ${error}`)
    }
    
} 

module.exports = {setUser,getUser}