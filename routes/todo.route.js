const express = require("express")
const toDoController = require ("../controllers/todo.controllers")
const {authenticateJWT} = require ("../middleware/authmiddleware")
const router = express.Router()

router.post("/new", authenticateJWT,  toDoController.newtodo)

router.get("/:id", authenticateJWT, toDoController.gettodo)

router.get("/",authenticateJWT, toDoController.getalltodo)

router.delete("/delete/:id", authenticateJWT, toDoController.deletetodo)

router.patch("/update/:id", authenticateJWT, toDoController.updatetodo)

module.exports = router