const mongoose = require("mongoose")

const ListModel = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
    date:{
        type: Date.now()
    },
    title:{
        type: String,
    },
    body:{
        type: String,
    },
   
})

module.exports = mongoose.model("List", ListModel)
