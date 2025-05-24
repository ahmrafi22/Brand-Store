const express = require("express");
const multer = require("multer");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const streamifier =require("streamifier") 

require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const storage = multer.memoryStorage();
const upload = multer({storage})

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json({ message: "No file uploaded" });
        }
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => { 
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(error)
                    }
                })

                //filebuffer into a stream
                streamifier.createReadStream(fileBuffer).pipe(stream)
             })
        }
        const result = await streamUpload(req.file.buffer)
        res.json({imageUrl: result.secure_url})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message});
    }
})

module.exports = router