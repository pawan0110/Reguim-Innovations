import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    if (!uploadResult) {
      throw new Error("Image upload failed");
    }

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    return {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    console.error("cloudinary upload error", error);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
};

export default uploadOnCloudinary;
