import mongoose from 'mongoose' ; 

const CommentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId , ref:"Post" , required:true 
    } , 
    author:{
        type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId , ref:"Comment" , default:"null" , 
    } , 
    body:{
        type:String, 
        required:true, 
    },
    bodyHtml:String , 
    likes:[{
        type:mongoose.Schema.Types.ObjectId, ref : "User"
    }] , 
    isDeleted:{
        type:Boolean , 
        default:false , 
    }
    
}  , {timeStamps:true})


export default mongoose.model("Comment" , CommentSchema) ; 