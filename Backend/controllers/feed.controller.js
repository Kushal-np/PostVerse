import Post from "../models/post.model";

export const getFeedPostsInfinite = async(req , res)=>{
    try{
        const userId = req.user._id ; 
        const {cursor , limit = 0 } = req.query ; 

        const currentUser = await User.findById(userId).select("following");
        const followingIds = currentUser.following ; 

        let query = {author:{$in : followingIds}};
        if(cursor){
            query.createdAt = {$lt: new Date(cursor)};
        }
        const posts = await Post.find(query)
        .sort({createdAt : -1})
        .limit(parseInt(limit))
        .populate("author" , "username profileImage")
        .populate('tags category')

        const nextCursor = posts.length ? posts[posts.length -1 ].createdAt:null ;
        res.status(200).json({
            success:true , 
            posts , 
            nextCursor
        })
    }
    catch(error){

    }
}