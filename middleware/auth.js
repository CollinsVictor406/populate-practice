const jwt = require("jsonwebtoken")

exports.auth = async (req,res,next) =>{
    const authHeader = req.headers.authorization
    console.log(authHeader);
    
    try{
        if(!authHeader){
        return res.status(404).json({messsage:"token not found"})
    }
    const token = authHeader.split(" ")[1]
   
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = decoded
    console.log(req.user);
    
    next()
    }
 catch(error){
    return res.status(500).json({message:error.message})
 }
}