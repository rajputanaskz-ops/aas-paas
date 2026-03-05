import { Router } from "express";
import { SignUpUser } from "../controllers/user/signup.controller.js";

const userRouter = Router()

userRouter.route('/signup').post(SignUpUser)

export {userRouter}

