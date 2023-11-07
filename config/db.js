const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log(`server is connected  to DataBase ${mongoose.connection.host}`);
  } catch (err) {
    console.log(`Error something went wrong ${err}`);
  }
};

module.exports = connectDB;
