import { Router } from "express";
import { CreateRegions } from "../controllers/admin/createRegions.js";


const adminRouter = Router()

adminRouter.route('/create-regions').post(CreateRegions)

export {adminRouter}

