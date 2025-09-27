import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name:{type:String , required:true , unique:true } , 
    slug:{type:String , required:true , unique:true } , 

} , 
{
    timeStamps:true 
}) 

export default mongoose.model("Tag",tagSchema);