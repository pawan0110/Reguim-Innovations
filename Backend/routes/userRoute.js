import express from "express"
import upload from "../middlewares/multer.js"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, updateProfile } from "../controller/userController.js"

const userRouter = express.Router()
console.log("hello from userrouter");

userRouter.get("/getcurrentuser", isAuth, getCurrentUser)
userRouter.post("/updateProfile", isAuth, upload.single("photo"),  updateProfile)

export default userRouter;