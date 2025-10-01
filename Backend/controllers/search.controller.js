import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const unifiedSearch = async(req , res)=>{
    try{
        const {q} = req.query;
        if(!q){
            return res.status(400).json({
                success:false , 
                message:"Query not done"
            })
        }
        const regex = new RegExp(q , "i") // case-insensitive

        const posts = await Post.find({
            $or:[
                {title:regex} , 
                {content:regex} , 
                {tags:regex} , 
            ],

        }).populate("author" , "username profileImage")


        const users = await User.find({
            $or:[
                {username:regex} , 
                {email:regex} , 
                {bio:regex} , 

            ] , 
        }).select("username profileImage")

        res.status(200).json({
            success:true , 
            posts , 
            users
        })
    }
    catch(error){
        res.status(500).json({
            success:false , 
            message:error.message
        })
    }
}