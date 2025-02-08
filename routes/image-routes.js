const express = require("express")

const authMiddleware = require("../middleware/auth-middleware")
const adminMiddleware = require("../middleware/admin-middleware")
const uploadMiddelware = require("../middleware/image-middleware")
const {uploadImageController} = require("../controllers/imageUpload-controller")
const router = express.Router()

router.post("/upload",authMiddleware,adminMiddleware,uploadMiddelware.single("image"),uploadImageController)

module.exports = router