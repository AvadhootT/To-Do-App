import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { databaseconnection } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
    path: "./data/config.env"
})

export const app = express();


//middlewares
//5. When sending json data back to api in the form of req.body → it throws error because there is no form and we are not using any kind of middleware for accessing that data url
//we are testing it on postman so to send json data to api we use below middleware
//to send json data back
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,
}))

//using routes
app.use( "/users", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res)=>{
    res.send("NICE WORKING")
})

app.use(errorMiddleware)

