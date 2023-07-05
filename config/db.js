const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
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
