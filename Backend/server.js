import express from 'express';
const app = express();
import dotenv from "dotenv";
import connectDB from './config/db.js';
dotenv.config();
const PORT = process.env.PORT ; 
app.get("/", (req , res)=>{
    res.send("Hello world");
})

app.listen(PORT , ()=>{
    console.log(`Server is running at the ${PORT}`); 
    connectDB();
})

