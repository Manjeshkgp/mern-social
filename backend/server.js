import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connect from "./database/mongodb.js";
import userRoute from "./routes/userRoute.js";
import postsRoute from "./routes/postsRoutes.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config()
const app = express();
const __dirname = fileURLToPath(new URL('.', import.meta.url));

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
await connect();
console.log("MongoDB connected successfully");

app.get("/",(req,res)=>{
    res.send("<h1>Home</h1>")
})

app.use("/",userRoute);
app.use("/",postsRoute);

app.use(passport.initialize());
passportConfig(passport)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});