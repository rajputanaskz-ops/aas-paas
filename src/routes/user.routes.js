import { Router } from "express";
import { SignUpUser } from "../controllers/user/signup.controller.js";
import { LoginUser } from "../controllers/user/login.controller.js";

const userRouter = Router()

userRouter.route('/signup').post(SignUpUser)
userRouter.route('/login').post(LoginUser)

export {userRouter}

