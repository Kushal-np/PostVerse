import express from 'express';
const app = express();
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from "./routes/auth.routes.js"
dotenv.config();
const PORT = process.env.PORT ; 
app.use(express.json())
app.use("/api/user" , authRoutes)

app.listen(PORT , ()=>{
    console.log(`Server is running at the ${PORT}`); 
    connectDB();
})

