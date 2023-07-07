const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
   
    email:{
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
   
    password:{
        type: String,
        required: [true, "password is required"]
    },
    confirm_password:{
        type: String,
       required:[true, "Please confirm your password"]
    },
    token: {
        type: String,
        default: null
    }
})



module.exports = mongoose.model("User", UserModel)