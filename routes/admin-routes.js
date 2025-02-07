const express = require("express")
const authMiddleware = require("../middleware/auth-middleware")


const router = express.Router()

router.get("/welcome",authMiddleware,(req,res)=>{
    res.json({message : "welcome to admin page"})
})

module.exports = router