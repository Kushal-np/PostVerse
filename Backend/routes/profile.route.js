import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateProfileImage } from "../controllers/profile.controller.js";
import upload from "../middlewares/upload.js";
const router = express.Router();


router.patch("/update-image" , authMiddleware  , upload.single("image") , updateProfileImage)


export default router ; 