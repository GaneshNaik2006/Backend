import { v2 as cloudinary } from "cloudinary"
import fs from 'fs'

 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadonCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilepath, {
            resource_type: "auto"
        });
        // file has been uploaded successfully
        if (fs.existsSync(localFilepath)) {
            fs.unlinkSync(localFilepath);
        }
        return response;
    } catch (error) {
        if (fs.existsSync(localFilepath)) {
            fs.unlinkSync(localFilepath); // remove the locally saved temporary file as the upload operation failed
        }
        return null;
    }
}


export { uploadonCloudinary };