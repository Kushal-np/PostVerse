import express from 'express';
const app = express();
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"
import commentRoutes from "./routes/comment.route.js"
import bookmarkRoutes from "./routes/bookmark.route.js"
import cookieParser from 'cookie-parser';
dotenv.config();
const PORT = process.env.PORT ; 
app.use(express.json())
app.use(cookieParser())
app.use("/api/user" , authRoutes)
app.use("/api/post" , postRoutes)
app.use("/api/comments" , commentRoutes) 
app.use("/api/bookmarks" , bookmarkRoutes);
app.listen(PORT , ()=>{
    console.log(`Server is running at the ${PORT}`); 
    connectDB();
})

