const cloudinary = require("../config/cloudinary")

const uploadCloudinary = async(filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(filePath)

        return {
            url : result.secure_url,
            publicId : result.public_id
        }

    }catch(e){
        console.error("error while uploading image in cloudinary",e)
        throw new Error ("error while uploading image in cloudinary")
    }
}

module.exports = {
    uploadCloudinary
}