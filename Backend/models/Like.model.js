import mongoose from "mongoose";


const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User" , 
        required:true , 
    },
    post:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"Post" , 

    },
    comment:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"Comment"
    },
    type:{
        type:String , 
        enum:["like" , "love" , "fire" , "thumb"] , 
        default:"like" , 
    }

},{
    timestamps:true
});
export default mongoose.model("Like" ,likeSchema )