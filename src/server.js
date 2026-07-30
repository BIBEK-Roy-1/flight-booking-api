import express from "express";
import dotenv from "dotenv";
import userRouter from "./users/user.routes.js";
import { connectToMongoDB } from "./config/mongoose.config.js";
import app from "./app.js";

dotenv.config();

app.use('/api/users',userRouter);

app.listen(process.env.PORT,()=>{
    console.log("server is listening at 3200");
    connectToMongoDB();
})