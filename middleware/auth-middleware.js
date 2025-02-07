const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({success : false,message : "Access denied please provide token or login first"})
    }

    
    try{
        
        const decodeTokenInfo =  jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.userInfo = decodeTokenInfo
          
        next()

    }catch(e){
        // console.log(e)
        return res.status(500).json({success : false,message : "Access denied please provide token or login first"})
    }
}

module.exports = authMiddleware