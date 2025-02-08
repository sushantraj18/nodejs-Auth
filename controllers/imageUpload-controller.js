const {uploadCloudinary} = require("../helper/cloudinaryHelper")
const imageModel = require("../models/image")
const uploadImageController = async (req,res)=>{
    try{

        if(!req.file){
            return res.status(400).json({success : false,message : "file is required please select image"})
        }

        // upload image to cloudinary
        const {url,publicId} = await uploadCloudinary(req.file.path)

        // upload in database 
        const newImageDocuments = await new imageModel({url,publicId,uploadedBy : req.userInfo.userId})
        await newImageDocuments.save()

        return res.status(201).json({success : true,message : "image upload success",image : newImageDocuments})

    }catch(e){
        console.log(e);

        return res.status(500).json({success : false,message : "somthing went wrong try again"})
        
    }
}

module.exports = {uploadImageController,}