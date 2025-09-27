import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};


export const signin = async(req , res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false , 
                message:"Invalid username or password"
            });
        }
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false, 
                message:"Invalid password or username"
            });
        }
        const token = jwt.sign(
        {
            id:user._id , 
            role: user.role
        },
        process.env.JWT_SECRET_KEY , 
        {expiresIn:"7d"}
        )

        res.cookie("token" , token , {
            httpOnly:true , 
            secure : false , 
            sameSite:"strict" , 
            maxAge: 7*24*60*60*1000
        });

        res.status(200).json({
            success:true , 
            message:"Login successfull" ,
            token , 
            user:{
                id:user._id , 
                username:user.username , 
                email:user.email , 
                role:user.role
            }
        })

    }
    catch(error){
        console.log("Login error" , error);
        res.status(500).json({
            success:false , 
            message:"Sever error during login"
        })
    }
}


export const signout = async(req, res) =>{
    try{
        res.clearCookie("token");

        return res.status(200).json({
            success:true , 
            message:"Logged out successfully"
        });
    }
    catch(error){
        console.log("Logout Error:" , error)
        res.status(500).json({
            success:false , 
            message : "Server error during logout"
        });
    }
};