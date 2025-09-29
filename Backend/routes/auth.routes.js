import express from "express"
import { getAllUsers, getMe, registerUser, signin, signout } from "../controllers/auth.controller.js";
const router = express.Router();
import {authMiddleware} from "../middlewares/auth.middleware.js"

router.post("/register" , registerUser);
router.post("/signin" , signin)
router.post("/signout" , signout)
router.get("/AllUsers" , getAllUsers);
router.get("/me"  , authMiddleware , getMe)
export default router ; 