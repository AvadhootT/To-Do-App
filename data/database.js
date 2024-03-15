import mongoose from "mongoose";

export const databaseconnection = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
    dbName: "Backend-API"
}).then(()=>{console.log("Database Connected!")}).catch((err)=>{console.log(err)});
}
