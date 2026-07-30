import UserRepository from "./user.repository.js";

export default class UserController{
    constructor(){
       const userrepository =new UserRepository();
    }
    signin(req,res){
        const user= userrepository.c
    }
}