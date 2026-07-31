import UserService from "./user.service.js"

export default class UserController{
    constructor(){
        this.userService =new UserService();
    }
    async signUp(req,res,next){
        try{
            const {name,email,password,gender}=req.body;
            const userData={
            name:name,
            email:email,
            password:password,
            gender:gender
        }
           const createdUser= await  this.userService.signUp(userData);
           return  res.status(201).send({
            id:createdUser.id,
            name:createdUser.name,
            email:createdUser.email,
            role:createdUser.role,
            gender:createdUser.gender,
            profileImage:createdUser.profileImage,
            createdAt:createdUser.createdAt,

           });
        }catch(err){
            next(err);
        }
       
    }

    async signIn(req,res,next){
        try{
        const {email,password}=req.body;
        const result=await this.userService.signIn(email,password);
        return res.status(200).json({
            message:"Login successfull",
            token :result.token,
            user:{
                 id: result.user._id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role
            }
        });
        }catch(err){
            next(err);
        }
       
    }
    
}