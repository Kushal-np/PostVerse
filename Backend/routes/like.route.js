import express from "express"
import { toggleLikeComment } from "../controllers/comment.controller";
import { getLikes, toggleLikePost } from "../controllers/like.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/toggle" ,authMiddleware ,  toggleLikePost) ; 
router.get("/:postId" , getLikes) ; 
router.get("/:commentId " , getCommentsLikes )


export default router ;