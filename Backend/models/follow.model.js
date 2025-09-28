import mongoose, { trusted } from 'mongoose'


const followSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"User" , 
        required:true , 
    },
    following:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"User",
        required:true 
    }
},{
    timestamps:times 
});

followSchema.index({follower:1 , following:1} , {unique:true})

export const Follow = mongoose.model("Follow" , followSchema);