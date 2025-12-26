import express from "express"

import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, updateProfile } from "../controller/userController.js"

const userRouter = express.Router()

userRouter.get("/getcurrentuser", isAuth, getCurrentUser)
userRouter.put("/updateprofile", isAuth, updateProfile)

export default userRouter;