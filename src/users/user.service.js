import bcrypt from "bcrypt";
import UserRepository from "./user.repository.js";

export default class UserService{
    constructor(){
          this.userRepository =new UserRepository();
    }
    async signUp(userData){
    userData.email=userData.email.toLowerCase().trim();
       const founduser=await this.userRepository.findByEmail(userData.email);
        if(founduser){
            throw new Error("Email is already registered");
        }
       

    }
}