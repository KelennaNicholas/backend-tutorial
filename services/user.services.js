const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Creating a new user

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password, confirm_password } = req.body;
    // Check if user exists by email

    const findUser = await User.findOne({ email });

    // If user exists, send an error message
    if (findUser)
      return res.status(400).json({
        message: "User with email already exists",
        success: true,
      });

    const hashedPassword = await bcrypt.hash(password, 10);


    // const usePassword = await jwt.sign({password}, process.env.JWT_SECRET, { algorithm: 'HS256' });
    //   console.log("usePassword:", usePassword)
    const user = await new User({
      name: name,
      email: email,
      password: hashedPassword,
      confirm_password: confirm_password
    });
    await user.save();

    const Access_Token = await jwt.sign(
      { id: user._id, name: user.name, age: user.age, gender: user.gender },
      process.env.JWT_SECRET,
      { expiresIn: 5 * 60 * 60 }
    );
    // console.log(Access_Token)
    user.token = Access_Token;

    user.password = "hidden";

    user.confirm_password = "hidden";

    // res.cookie("jwt", Access_Token)

    if (!user)
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
      });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};

// Getting single user

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (id.length !== 24)
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });
    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User was not found",
      });
    return res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Getting all users

const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const usePage = page - 1;
    if (usePage == 0)
      return res.status(400).json({
        success: false,
        message: "Invalid page",
      });
    const users = await User.find()
      .skip(usePage * limit)
      .limit(limit);
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users: users,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Delete a single user

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    if (id.length !== 24)
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });
    // const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
};

// Edit a Users Info

const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    if (id.length !== 24)
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
      message: "User info update successfully",
      success: true,
      User: user,
    });
  } catch (err) {
    console.log(err);
  }
};

// For logging in a user

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // const decoded = jwt.verify(user.password, process.env.JWT_SECRET)
    // if(password !== decoded) return res.status(400).json({
    //     success :false,
    //     error: "Invalid credentials"
    // })
    // if (user === null)
    //   return res.status(400).json({
    //     success: false,
    //     error: "User not found",
    //   });

    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(400).json({ message: "Failure" });
    } else {
      const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET,);
      return res.status(200).header("auth-token", token).json({ message: "Success" ,  "token": token });
    }

    
  } catch (err) {
    console.log(err);
  }

  // return res.status(200).json({
  //   message: "successful",
  //   user: decoded,
  // });
  // console.log("Decoded: ", decoded)
};



module.exports = {
  register,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
