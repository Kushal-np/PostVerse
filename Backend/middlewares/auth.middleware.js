import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


export const authMiddleware = async(req , res) =>{
    try{
        const token = req.header("Authorization")?.replace("Bearer","");
        if(!token){
            return res.status(401).json({
                message:"No token , authorization denied"
            });
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({
                message:"User not found"
            });
        }
        req.user = user ; 
        next();
    }
    catch(error){
        console.log("Auth error:" , error.message);
        res.status(401).json({
            message:"Token is not valid"
        })
    }
}


export const authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.roles)){
            return res.status(403).json({
                message:"Access denied"
            })

        }
        next();
    }
}