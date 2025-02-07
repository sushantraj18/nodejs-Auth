const isAdminValid = (req,res,next)=>{
    if(req.userInfo.role !== 'admin'){
        return res.status(403).json({success : false, message : "Access denied! only admin can access this page"})
    }
    next()
}

module.exports = isAdminValid