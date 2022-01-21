const mongoose = require("mongoose");

require("dotenv").config();

module.exports = () => {
  return mongoose.connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zkdfr.mongodb.net/bellavitaData?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
// const conn = mongoose.connection;
// mongoose.connection.once("open", () => {
//   console.log("MongoDB Connected");
// });
// mongoose.connection.on("error", (err) => {
//   console.log("MongoDB connection error: ", err);
// });
