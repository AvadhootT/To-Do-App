import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { sendCookies } from "../utilities/features.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import ErrorHandler from "../middlewares/error.js";


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            // Create the user if it doesn't exist
            user = new User({ name, email, password });
            await user.save();
        } else {
            // Optionally, you can return an error here if the user already exists
            return next(new ErrorHandler("User Already Exists", 409));
        }

        // Send cookies for registration
        sendCookies(user, res, 201, "Registered Successfully");
    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next)=>{

    try {
        const {name, email, password} = req.body;

        const user = await User.findOne({email}).select("+password");
    
        if(!user) 
            return next(new ErrorHandler("Invalid email or password", 404))
    
    
        const isMatch = bcrypt.compare(password, user.password);
    
        if(!isMatch) 
            return next(new ErrorHandler("Invalid email or password", 404))
    
        sendCookies(user, res, 200, `Logged In Successfully -> Welcome back ${user.name}`);
    } catch (error) {
        next(error);
    }

}


export const getMyProfile =  async (req, res)=>{

    // res.cookie() -> token -> id -> extract krun -> database mdhe find krun -> return karaycha
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        next(error);
    }

}


export const logout = (req, res, next)=>{

    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development"?"lax" : "none",
            secure: process.env.NODE_ENV === "Development"?false : true
        }).json({
            success: true,
            message: "Logged out Successfully"
        })
    
    } catch (error) {
        next(error);        
    }
}
