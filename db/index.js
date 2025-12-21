import mongoose from "mongoose";
import {DB_NAME} from "../src/constants.js";

const connectDB = async () => {
    try {
        // why connectionInstance variable is used?
        const connectionInstance = await mongoose.connect (`${process.env.MONGODB_URI}/${DB_NAME}`);
        // what is inside connectionInstance?
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`) //This is to make sur that you are at correctserver. as development,testing and production can have diffrent servers. So to insure you are at write server this statement is written, It will return currection connected host


    } catch (error){
        console.log("MONGODB connection Failed", error);
        process.exit(1); //why proces.exit(1) is written and can we put any other number than 1.

    }
}

export default connectDB