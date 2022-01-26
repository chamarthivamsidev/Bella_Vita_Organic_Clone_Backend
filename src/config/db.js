const mongoose = require("mongoose");

require("dotenv").config();

module.exports = () => {
  return mongoose.connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://vamsi:vamsi1147@cluster0.zkdfr.mongodb.net/bellavitaData?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};
