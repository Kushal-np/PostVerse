import express from 'express';
const app = express();
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.route.js";
import bookmarkRoutes from "./routes/bookmark.route.js";
import likeRoutes from "./routes/like.route.js";
import followRoutes from "./routes/follow.route.js";
import notificationRoutes from "./routes/notification.route.js"
import profileRoutes from "./routes/profile.route.js"
import cookieParser from 'cookie-parser';
import feedRoutes from "./routes/feed.route.js"
import categoriesAndTagsRoutes from "./routes/CategoryAndTag.route.js"
dotenv.config();
const PORT = process.env.PORT ; 
app.use(express.json());
app.use(cookieParser());
app.use("/api/user" , authRoutes);
app.use("/api/post" , postRoutes);
app.use("/api/comments" , commentRoutes);
app.use("/api/bookmarks" , bookmarkRoutes);
app.use("/api/follow" , followRoutes);
app.use("/api/likes" , likeRoutes);
app.use("api/CategoryAndTags/" , categoriesAndTagsRoutes);
app.use("/api/Notifications" , notificationRoutes);
app.use("/api/picture" , profileRoutes);
app.use("/api/home" , feedRoutes)
app.listen(PORT , ()=>{
    console.log(`Server is running at the ${PORT}`); 
    connectDB();
})

