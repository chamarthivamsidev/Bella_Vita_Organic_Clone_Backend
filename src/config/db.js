const mongoose = require("mongoose");

require("dotenv").config();

module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zkdfr.mongodb.net/bellavitaData?retryWrites=true&w=majority`
  );
};
