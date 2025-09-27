import express from "express"
import { registerUser, signin, signout } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register" , registerUser);
router.post("/signin" , signin)
router.post("/signout" , signout)
export default router ; 