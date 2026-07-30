import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

 const url=process.env.MONGODB_URI;
 export const connectToMongoDB =async()=>{
         try{
           await mongoose.connect(url)
            console.log("mongodb is connected")
         }catch(err){
            console.log("Error while connecting to MongoDB using mongoose");
            console.log(err);
         }
}