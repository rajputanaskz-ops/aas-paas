import { Router } from "express";
import { SignUpUser } from "../controllers/user/signup.controller.js";
import { LoginUser } from "../controllers/user/login.controller.js";
import { forgotPassword } from "../controllers/user/forgot_password.controller.js";

const userRouter = Router()

userRouter.route('/signup').post(SignUpUser)
userRouter.route('/login').post(LoginUser)
userRouter.route('/forgotPassword').post(forgotPassword)

export {userRouter}

