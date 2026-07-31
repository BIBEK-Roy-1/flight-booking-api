import express from "express";
import userRouter from "./features/users/user.routes.js";
import errorHandler from "./middleware/error.middleware.js";


const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("flight booking api");
})

app.use("/api/auth",userRouter);
app.use(errorHandler);

export default app;