import express from 'express';
import UserController from './user.controller.js';
import jwtauth from '../../middleware/jwt.middleware.js';


const userRouter=express.Router();
const userController=new UserController();

userRouter.post("/register",(req,res,next)=>{
    userController.signUp(req,res,next);
});
userRouter.post("/login",(req,res,next)=>{
    userController.signIn(req,res,next);
});
userRouter.get("/profiletest",jwtauth,(req,res)=>{
            res.status(200).json({
                message:"Authentication successful",
                userId:req.user
            })
});


export default userRouter;