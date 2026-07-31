import UserModel from "./user.model.js"

export default class UserRepository{
        async createUser(userData){
            const newUser=new UserModel(userData);
           await newUser.save();
            return newUser;
        }
        async findByEmail(email){
            try{
               return await UserModel.findOne({email});
            }catch(err){
                throw err;
            }
        }
}