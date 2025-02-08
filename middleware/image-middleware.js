const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"uploads/")
    },

    filename : function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

// filefilter check 

const checkFileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image")){
        cb(null,true)
    }else{
        cb(new Error("please upload a only image"))
    }
}

// image middleware 

module.exports = multer({
    storage:storage,
    fileFilter : checkFileFilter,
    limits : {
        fileSize : 4 * 1024 * 1024   //file size limit
    }
})