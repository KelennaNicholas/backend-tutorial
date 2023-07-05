const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Kelenna:Niklauz2497@cluster0.rdbnat3.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //    useCreateIndex: true
    });
    console.log(`Mongoose Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
