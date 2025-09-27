import express from "express"
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware";
const router = express.Router();


router.post("/", authMiddleware , authorizeRoles("author" , "admin") );


export default router ; 