import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    recipient:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"User" , 
        required:true 

    } , 
    sender:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"User" , 
    }, 
    type:{
        type:String , 
        enum:["like" , "comment" , "follow" , "mention"],
        required:true , 
    }, 
    post:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:"Post" , 

    } , 
    comment:{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"Comment"
    },
    read:{
        type:Boolean , 
        default:"false" , 
    } , 

},{
    timestamps:true
});

export default mongoose.model("Notification" , notificationSchema)