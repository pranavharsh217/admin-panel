import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { urlencoded } from "express"
import cors from "cors"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.routes.js";
import formRoute from "./routes/form.routes.js";
dotenv.config({})
const app=express()


//middleware
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser())
const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))
const PORT= process.env.PORT || 8000;

//api
app.use("/api/v1/user",userRoute)
app.use("/api/v1/form",formRoute)
app.listen(PORT,()=>{
    connectDB()
    console.log(`server listen at port ${PORT}`);
    
})