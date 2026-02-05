const User = require("../Model/user.js")
const slugify = require("slugify")

async function handlePostLoginRoutes(req,res) {
    try {
        const {email, password} = req.body
        const token = await User.matchPasswordAndGenerateToken(email,password)
        res.status(200).json(
            {status : 'Success',
                data : { token : token}
            })
        
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }
}

async function handlePostRegistration(req,res) {
    try {
        const user = req.body
        const {
            userName,
            email,
            password,
            phone,
            age,
            city,
            address
        }  = req.body
        const newUser = await User.create({
            userName,
            email,
            password,
            slug : slugify(userName),
            phone,
            age,
            city,
            address
        })
        const userEmail = newUser.email
        const userRole = newUser.role
        res.status(201).json({message : 'Success ', data :{userEmail,userRole}})
    
    } catch (error) {
        res.status(400).json({
            status : "Failed",
            message : error.message
        })
    }

}

function handleGetLogin(req,res){
    try {
        res.json({message : "Success", date  : "Wellcome in login page"})
    }
     catch (error) {
        res.status(500).json({
            status : "Failed",
            message : error.message
        })  
    }}
function handleGetResgistration(req,res){
    res.json({message : "Success", date  : "Wellcome in Sign up page"})
}

async function handleAllAuth(req,res){
    try {
        const allUsers = await User.find({isActive : true }).select("-_id userName email phone age city role address totalOrders totalSpent")
        res.status(200).json({message : "Success",data :allUsers})
        
    } catch (error) {
        res.json({
            status : "Failed",
            message : error.message
        })
    }
}

async function handleUser (req,res){
    try {
        const {url} = req.params
        const registerUser = req.user.role
        const registerSlug = req.user.slug
        
        if(registerUser !== "Admin" && url !== registerSlug){
            return res.status(404).json(
                {
                    status : "Failed",
                    message : "404 page not found"
                }
            )
        }
        const user = await User.findOne({slug : url}).select("-_id userName email phone age city address totalOrders totalSpent")
        
        if(!user){
            return res.status(404).json({
                status : "Failed",
                message : "404: Page not found"
            })
        }
        res.status(200).json({message :"Success",data : user})
        
    } catch (error) {
        res.json({
            status : "Failed",
            message : error.message
        })
    }

}
async function patchHandleUser(req, res) {
  try {
    const { url } = req.params;
    const updateData = req.body;
    const requesterRole = req.user.role;
    const requesterSlug = req.user.slug;

    if (requesterRole !== "Admin" && url !== requesterSlug) {
      return res.status(404).json({
        status: "Failed",
        message: "404 page not found",
      });
    }
    if (requesterRole !== "Admin") {
      delete updateData.role;
    }

    delete updateData.password;

    const user = await User.findOneAndUpdate(
      { slug : url},
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select("-_id userName email phone age city address totalOrders totalSpent")

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "Success",
      data: user,
    });

  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Page not found",
    });
  }
}


module.exports = {handlePostLoginRoutes,
    handlePostRegistration,
    handleGetLogin,
    handleGetResgistration,
    handleAllAuth,
    handleUser,
    patchHandleUser
}
