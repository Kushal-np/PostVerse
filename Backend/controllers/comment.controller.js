
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const createComment = async (req, res) => {
  try {
    const { post: postId, parent, body } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (parent) {
      const parentComment = await Comment.findById(parent);
      if (!parentComment) {
        return res
          .status(404)
          .json({ success: false, message: "Parent comment not found" });
      }
    }

    const newComment = await Comment.create({
      post: postId,
      parent: parent || null,
      body,
      author: req.user._id,
    });

    post.commentsCount = (post.commentsCount || 0) + 1;
    await post.save();

    const populatedComment = await Comment.findById(newComment._id).populate(
      "author",
      "username role"
    );

    res.status(201).json({
      success: true,
      comment: populatedComment,
    });
  } catch (err) {
    console.error("Create Comment Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error creating comment" });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({
      post: postId,
      isDeleted: false,
    })
      .populate("author", "username role")
      .sort({ createdAt: 1 });
  } catch (error) {
    console.log("Get comments error", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching comments ",
    });
  }
};

export const updateComment = async(req, res)=>{
    try{
        const {commentId} = req.params ; 
        const {body} = req.body;
        const comment = await Comment.findById(commentId);
        if(comment.author.toString() !== req.user._id.toString() && !["admin","editor"].includes(req.user.role)){
            return res.status(403).json({
                success:false , 
                message:"Not authorized to edit the comment"

            })
        }
        comment.body = body || comment.body ; 
        await comment.save();

        res.status(200).json({
            success:true , 
            comment 
        })
    }
    catch(error){
        console.log("Update comment error" , error);
        res.status(500).json({
            success:false , 
            message:"Internal server error"
        })
    }
}


export const toggleLikeComment = async(req , res) =>{
    try{
        const {commentId} = req.params ; 
        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({
                success:false , 
                message:"No comments found", 
            })
        }
        const userId = req.user._id.toString();
        const linkedIndex = comment.likes.findIndex(id=> id.toString()=== userId);

        if(linkedIndex===-1){
            comment.likes.push(userId);
        }
        else{
            comment.likes.splice(linkedIndex , 1);
        }
        await comment.save();
        res.status(200).json({
            success:true , 
            message:"Server error liking Comment"
        })
    } 
    catch(error){
        console.log("Toggle like comment Error:" , error );
        res.status(500).json({
            success:false , 
            message:"Server error liking comment "
        })
    }
}


export const deleteComment = async(req, res)=>{
    try{
        const {commentId} = req.params; 
        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.staus(404).json({
                success:false , 
                message:"Comment not found"
            });
        }
        else{
            if(comment.author.toString() !== req.user._id.toString() && !["admin" , "editor" ].includes(req.user.role)){
                return res.status(403).json({
                    success:false, 
                    message:"Not authorized"
                })
            }
            await Comment.findByIdAndDelete(commentId);

            const post = await Post.findById(comment.post);
            if(post){
                post.commentsCount = Math.max((post.commentsCount || 1)-1 , 0 );
                await post.save();
            }
            res.status(200).json({
                success:true , 
                messsage:"Comment deleted"
            });
        }
    }
    catch(error){
        console.log("Delete comment error: " , error);
        res.status(500).json({
            success:false , 
            message:"Server error deleting the comments"
        })
    }
}