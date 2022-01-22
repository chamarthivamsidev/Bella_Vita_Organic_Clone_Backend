const express = require("express");

const app = express();
const connect = require("./config/db");
const bodyparser = require("body-parser");

// const userController = require("./controllers/user.controller");
const product_controller = require("./controllers/product_controller");
const cart_controller = require("./controllers/cart_controller");
const addtocart_controller = require("./controllers/addtocart_controller");

app.use(express.json());
app.set("view engine", "ejs"); // root directory for views views/
app.use(express.static("public"));

// app.use("/users", userController);
// app.get("/", function (req, res) {
//   res.render("index.ejs", {});
// });
app.get("/", function (req, res) {
  res.render("landingPage.ejs", {});
});

app.get("/signup", async (req, res) => {
  res.render("signup.view.ejs", {});
});

app.use("/products", product_controller);
app.use("/cart", cart_controller);

app.use("/addtocart", addtocart_controller);

app.listen(process.env.PORT || 3333, async () => {
  try {
    await connect();
    console.log(`Listening to the port ${process.env.PORT || 3333}`);
  } catch (error) {
    console.log("Database is not connected");
    console.log(error.message);
  }
});
