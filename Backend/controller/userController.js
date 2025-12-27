import User from "../models/userModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import upload from "../middlewares/multer.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("name email profilePic");

        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "server error"})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.userId;

        let profilePicUrl = null;
        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            if (uploadResult) {
                profilePicUrl = uploadResult.url;
            }
        }

        // Update user
        const updateData = {};
        if (name) updateData.name = name;
        if (profilePicUrl) updateData.profilePic = profilePicUrl;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("name email profilePic");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}