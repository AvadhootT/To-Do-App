import mongoose from "mongoose"

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select: false,  //whenever i try to access the password in the cannot i cannot access it for that -> i have select it manually 
                        //=> i simple words when user is accessed all data is send except the password-> if we wand password mention it to access it
        required: true,
    },
    createdAt: {
        type: Date,
        default:Date.now,
    }
})

export const User = mongoose.model("User", schema)