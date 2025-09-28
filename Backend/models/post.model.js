import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      text: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, 
    },
    bodyMarkDown: {
      type: String,
      required: true, 
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
    coverImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media', 
    },
    commentsCount:{
      type:Number , 
      default:0
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft', 
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public', 
    },
    publishedAt: {
      type: Date, 
    },
    category:{
      type:mongoose.Schema.Types.ObjectId , 
      ref:"Category" ,
    },
    tags:[{
      type:mongoose.Schema.Types.ObjectId , 
      ref:"Tag"
    }]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post" , PostSchema)

export default Post ; 