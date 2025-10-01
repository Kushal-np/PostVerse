// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("Authorization header:", authHeader); // Debug

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
    console.log("Extracted token:", token); // Debug

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token payload:", decoded); // Debug

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    next();
  } catch (error) {
    console.error("Auth Error:", error.message, error.name); // Debug
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("authorizeRoles [", new Date().toISOString(), "]: req.user:", JSON.stringify(req.user, null, 2));
    if (!req.user || !roles.includes(req.user.role)) {
      console.log("authorizeRoles: Access denied - Role mismatch:", req.user?.role, "Required:", roles);
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };
};