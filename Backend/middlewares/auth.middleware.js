import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // <-- split "Bearer <token>"

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


export const authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:"Access denied"
            })

        }
        next();
    }
}