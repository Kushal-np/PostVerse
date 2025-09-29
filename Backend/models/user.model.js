import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username:{
        type:String , 
        unique:true , 
        required:true , 
    },
    email:{
        type:String , 
        unique:true , 
        required : true ,
    },
    password:{
        type:String , 
        required:true 
    },
    role:{
        type:String, 
        enum: ["reader" , "writer" , "editor" , "admin"] ,
        default:"reader" , 
    } , 
    name:{
        type:String , 
    },
    bio:{
        type:String , 
    },
    profilePicture:{
        type:String , 
        default:""
    },
    coverPicture:{
        type:String , 
        default:""
    },
    social:{
        twitter:String,
        github:String ,
        website:String
    },
    settings:{
        theme:{
            type:String,
            enum:["light","dark"],
            default:"light"
        },
        emailNotifications:{
            type:Boolean,
            default:true

        }
    },
    following:[{
        type:mongoose.Schema.Types.ObjectId , ref:"User"
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId , ref:"User"
    }],
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId , ref:"Post"
    }]
} , {
    timestamps:true
})




const User = mongoose.model("User",UserSchema) ;
export default User ; 