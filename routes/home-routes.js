const express = require("express")
const authMiddleware = require("../middleware/auth-middleware")
const router = express.Router()

router.get("/welcome",authMiddleware,(req,res)=>{
    const {userId,userName,role} = req.userInfo
    
    res.json({message : "welcome  to  home page", _id : userId, userName : userName , role:role})
})

module.exports = router