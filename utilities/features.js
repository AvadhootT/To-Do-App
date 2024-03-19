import jwt from "jsonwebtoken";


export const sendCookies = (user, res, statuscode= 200, message)=>{

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    res.status(statuscode).cookie("token", token, {
        httponly: true,
        maxAge: 15*60*1000,
        sameSite: process.env.NODE_ENV.toLowerCase() === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV.toLowerCase() === "development" ? false : true
    }).json({
        success: true,
        message,
    })

}