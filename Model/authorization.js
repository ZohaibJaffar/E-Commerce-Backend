const bcrypt = require("bcrypt")
const {setUser} = require("../Utils/JWT.js")
const {Schema,model} = require("mongoose")

const userSchema = Schema({
    userName :{
        type : String,
        required : [true,"Name is needed"]

    },
    email :{
        type : String,
        required : [true, "Email is needed"],
        unique : [true,"Email is already exist"]
    },
    password:{
        type : String,
        required : [true,"Password is required"]
    },
    shortUrl: {
        type : String,
        required : [true , " Need Url "]
    },
    role :{
        type : String,
        enum : ["Admin","User","Manager"],
        default : "User"
    }

    },{timestamps : true })
userSchema.pre("save",async function (next){
        const user = this
        if(!user.isModified("password")) return null;
        try {
            user.password = await bcrypt.hash(user.password,10)
        } catch (error) {
            
        }
       })
userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user = await this.findOne({email})
    if (!user){ throw new Error("Invalid email");}
    const checkpass = await bcrypt.compare(password, user.password)
    if(!checkpass) {throw new Error ("Incorrect Password")}
    const token = await setUser(user)
    return token
    // if (!user) return null;
    // const salt = user.salt
    // const hashedPassword = user.password

    //  const userhashedPassword = createHmac('sha256',salt)
    // .update(password)
    // .digest('hex')
    // if(hashedPassword !== userhashedPassword) throw new Error ("Incorrect Password")
    // return setUser(user)
})


const authUser = model("authUser",userSchema)

module.exports = authUser


