import express from 'express'
const router = express.Router();



router.post("/:postId" , authMiddleware , addBookmark) ;
router.delete("/:postId" , authMiddleware , removeBookmark);
router.get("/" , authMiddleware , getBookmarks);


export default router ; 



