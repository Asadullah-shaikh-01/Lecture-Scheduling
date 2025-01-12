import multer from "multer";
import cloud from "../Util/Cloudinary.js";

const storage =  multer.diskStorage({
    cloudinary: cloud,  // Make sure to pass 'cloudinary' to the parameter 'cloudinary'
    params: {
        folder: "courses", // Folder name in your Cloudinary account
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});



const storageVideo =  multer.diskStorage({
    cloudinary: cloud,  // Make sure to pass 'cloudinary' to the parameter 'cloudinary'
    params: {
        folder: "video", // Folder name in your Cloudinary account
        allowed_formats: ["mp4", "avi", "mov", "wmv"], // Allowed video format
    },
});



const upload = multer({ storage,storageVideo });
export default upload 