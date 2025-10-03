import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.route.js";
import bookmarkRoutes from "./routes/bookmark.route.js";
import likeRoutes from "./routes/like.route.js";
import followRoutes from "./routes/follow.route.js";
import notificationRoutes from "./routes/notification.route.js";
import profileRoutes from "./routes/profile.route.js";
import cookieParser from "cookie-parser";
import feedRoutes from "./routes/feed.route.js";
import categoriesAndTagsRoutes from "./routes/CategoryAndTag.route.js";
import searchRoutes from "./routes/search.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/CategoryAndTags", categoriesAndTagsRoutes);
app.use("/api/Notifications", notificationRoutes);
app.use("/api/pictures", profileRoutes);
app.use("/api/home", feedRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at the ${PORT}`);
  connectDB();
});
