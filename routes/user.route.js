const express = require("express")
const userController = require ("../controllers/user.controller")
const { verifyUserToken } = require("../middleware/authmiddleware")
const router = express.Router()

// router.get("/", userController.getAllUsers)

router.post("/create", userController.registration)

router.post("/login", userController.login)

// router.patch("/edit/:id" , userController.updateUser)

// router.get("/:id", userController.getUser)

// router.delete("/delete/:id", userController.deleteUser)


module.exports = router