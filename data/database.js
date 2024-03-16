import mongoose from "mongoose";

export const databaseconnection = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
    dbName: "Backend-API"
}).then((c)=>{console.log(`Database Connected with ${c.connection.host}`)}).catch((err)=>{console.log(err)});
}
