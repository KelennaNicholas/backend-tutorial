
const express = require("express")
const cors = require("cors")
const app = express()
const userRoutes = require("./routes/user.route")
const toDoRoutes = require("./routes/todo.route")
const colors = require("colors")
const dotenv = require("dotenv")
const connectDb = require('./config/db')


dotenv.config()
app.use(cors())

require("./routes/index.routes")(app)

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = 5000


 
app.use("/users", userRoutes)

app.use("/todo", toDoRoutes)

const server = app.listen(
    PORT,
    console.log(`Server is running on ${PORT}`)
)

connectDb()
