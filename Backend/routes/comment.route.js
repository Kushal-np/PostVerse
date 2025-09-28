
import express from "express";
const router = express.Router();


router.post("/" , authMiddleware , createComment) ; 
router.get("/:postId" , getCommentsByPost) ; 
router.patch("/edit/:commentId" , authMiddleware , updateComment) ; 
router.patch("/like/:commentId" , authMiddleware , likeComment);
router.delete("/:commentId" , authMiddleware , deleteComment); 


export default router ; 