import bcrypt from "bcryptjs"
import User from "../models/user.model";


export const registerUser = async(req , res) =>{
    try{
        const [username , email , password] = req.body; 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                sucess:false , 
                message:"User already exists with this email"
            });
        }

        const salt = bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username , 
            email , 
            password:hashedPassword , 
        });

        await newUser.save();

        res.status(201).json({
            success:true , 
            message:"User registered Successfully " , 
            user:{
                id:newUser._id , 
                username:newUser.username , 
                email: newUser.email , 
            }
        });
    }
    catch(error){
        console.log("Register Error:" , error);
        res.status(500).json({
            success:false, 
            message:"Server error during registration"
        })
    }
}