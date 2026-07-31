import bcrypt from "bcrypt";
import UserRepository from "./user.repository.js";
import ApplicationError from "../../error-handler/applicationError.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export default class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(userData) {
    //validate name
    if (!userData.name || typeof userData.name !== "string") {
      throw new ApplicationError("Name is required", 400);
    }
    userData.name = userData.name.trim();

    if (!userData.name || typeof userData.name !== "string") {
      throw new ApplicationError("Name is required", 400);
    }

    //validate email
    if (!userData.email || typeof userData.email !== "string") {
      throw new ApplicationError("Email is required", 400);
    }

    userData.email = userData.email.toLowerCase().trim();

    if (!userData.email) {
      throw new ApplicationError("Email is required", 400);
    }
    const foundUser = await this.userRepository.findByEmail(userData.email);
    if (foundUser) {
      throw new ApplicationError("Email is already registered", 409);
    }

    //validate password
    const password = userData.password;
    if (!password || typeof password !== "string") {
      throw new ApplicationError("Password is required", 400);
    }
    if (password.length < 8 || password.length > 12) {
      throw new ApplicationError(
        "Password must be between 8 to 12 charcters",
        400,
      );
    }
    if (/\s/.test(password)) {
      throw new ApplicationError("Password must not contain spaces", 400);
    }
    if (!/[^\w\s]/.test(password)) {
      throw new ApplicationError(
        "Password must contain at least one special character",
        400,
      );
    }
    userData.password = await bcrypt.hash(password, 12);
    userData.role = "user";
    const user = await this.userRepository.createUser(userData);

    return user;
  }

  async signIn(email,password){
    //validate email
    if (!email || typeof email !== "string") {
      throw new ApplicationError("Email is required", 400);
    }

    email =email.toLowerCase().trim();

    if (!email) {
      throw new ApplicationError("Email is required", 400);
    }
    const foundUser = await this.userRepository.findByEmail(email);
    if(!foundUser){
        throw new ApplicationError("Invalid email or Password",401);
    }

    // validate password
    if (!password || typeof password !== "string") {
      throw new ApplicationError("Invalid email or password", 401);
    }
    const isPasswordValid = await bcrypt.compare(password,foundUser.password);
    if(!isPasswordValid){
        throw new ApplicationError("Invalid email or password",401);
    }
        const token=JWT.sign(
            {userId: foundUser._id,
            email:foundUser.email,
            role:foundUser.role},

            process.env.JWT_SECRET,

            {
             expiresIn : process.env.JWT_EXPIRES_IN
            } 
        )

    return {
        user: foundUser,
        token:token
    };


  }
}
