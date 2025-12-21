// require('dotenv').config({path: './env'}) < 3.This is to load all envronment variable as soon as my application loads. But using 'require' and 'import' both create a unconsistent behaviour so we will do diffrent metthod>
import dotenv from "dotenv"; // 4.1 to solve problem of "3." we will first do this to import dotenv. 4.2 is in package.json


import connectDB from "../db/index.js";

dotenv.config({
    path: './env'
})

connectDB(); // 2.It will execute the connectDB(), and it should have done what we wanted from it.





// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

// import express from "express";

// const app= express();

// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.on("errror", (error) => {
//             console.log("ERRR: ", error);
//             throw error
//         })
//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw err
//     }

// })