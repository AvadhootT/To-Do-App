import { app } from "./app.js";
import { databaseconnection } from "./data/database.js";

databaseconnection();

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on Port:${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
