import dotenv from "dotenv";
import { connectToMongoDB } from "./config/mongoose.config.js";
import app from "./app.js";

dotenv.config();
const PORT=process.env.PORT || 3200;
async function connectToMongo(){
    try{
        await connectToMongoDB();
        app.listen(PORT,()=>{
        console.log(`server is listening at ${PORT}`);
})
    }catch(err){
        throw new Error("MongoDB Connection failed");
    }
}

connectToMongo();

