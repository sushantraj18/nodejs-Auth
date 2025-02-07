const jwt = require("jsonwebtoken")

const authMiddleware = async(req,res,next)=>{
    const authHeader = req.headers['authorization']
    console.log(authHeader)

    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({success : false,message : "Access denied please provide token or login first"})
    }

    
    try{
        
        const decodeTokenInfo =  jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decodeTokenInfo)
        req.userInfo = decodeTokenInfo

        next()
    }catch(e){
        console.log(e)
    }
}

module.exports = authMiddleware