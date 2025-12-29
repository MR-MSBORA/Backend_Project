import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,//It tells who aree allowed to access backend from a browser.
    credentials: true
    //credential means allowing the browser to send authentication data with a request.That includes: Cookies , Session IDs , Authorization headers(like JWT in some cases)

}))
app.use(express.json({limit:"16kb"}))//This middleware lets Express read JSON request bodies while protecting your server from oversized payloads.
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



export { app }