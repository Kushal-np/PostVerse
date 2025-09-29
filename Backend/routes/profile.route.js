import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { updateProfileImage } from "../controllers/profile.controller";
const router = express.Router();


router.patch("/update-image" , authMiddleware  , upload.single("image" , updateProfileImage))


export default router ; 