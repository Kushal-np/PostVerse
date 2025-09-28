import express from "express"
import { getAllUsers, registerUser, signin, signout } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register" , registerUser);
router.post("/signin" , signin)
router.post("/signout" , signout)
router.get("/AllUsers" , getAllUsers);
export default router ; 