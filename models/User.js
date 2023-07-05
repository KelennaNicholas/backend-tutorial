const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    age:{
        type: Number,
        required: [false, "age is required"]
    },
    email:{
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    gender:{
        type: String,
        enum: ["M", "F"],
        required: [false, "gender is required"]
    },
    password:{
        type: String,
        required: [true, "password is required"]
    },
    confirm_password:{
        type: String
    },
    token: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("User", UserModel)