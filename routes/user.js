//this file will contains all routing related to users
//we can import app and use it in this file everywhere as app.get app.post -> why there is need for router
//you can see below this file has prefix /user in all routing -> we can add custom prefix with the help of routing
//when importing in the app.js this file as a middleware add parameter "/users" -> so everywhere the routing will start from /users -> we have not to mention everytimee

import express from "express";
import { User } from "../models/user.js";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMyProfile)

router.get("/logout", isAuthenticated, logout)

router.post("/new", register)

router.post("/login", login)


// router.route("/userid/:id").get(getUserDetail)  //better way of chaining than below writing single code for every request
// router.get("/userid/:id", getUserDetail)


export default router;