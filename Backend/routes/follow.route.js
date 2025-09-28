import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { followUser, getFollowers, unfollowUser } from "../controllers/follower.controller.js";
const router = express.Router();

router.post("/follow/:userId" , authMiddleware , followUser);
router.delete("/unfollow/:userId" , authMiddleware , unfollowUser) ; 
router.get("/followeres/:userId" , getFollowers) ; 


export default router ; 