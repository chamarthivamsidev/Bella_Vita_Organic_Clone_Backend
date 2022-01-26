const express = require("express");

const app = express();
const connect = require("./config/db");
const bodyparser = require("body-parser");
const passport = require("./config/passport");

const userController = require("./controllers/user.controller");
const product_controller = require("./controllers/product_controller");
const cart_controller = require("./controllers/cart_controller");
const addtocart_controller = require("./controllers/addtocart_controller");
const address_controller = require("./controllers/address.controller");

app.use(express.json());
app.set("view engine", "ejs"); // root directory for views views/
app.use(express.static("public"));

app.get("/", function (req, res) {
  user = {};
  user["_id"] = null;
  res.render("landingPage.ejs", { user: user });
});

app.use("/products", product_controller);
app.use("/cart", cart_controller);
app.use("/users", userController);

app.use("/addtocart", addtocart_controller);
app.use("/address", address_controller);

app.get("/signup", async (req, res) => {
  res.render("signup.view.ejs", {});
});

app.use("/checkout", async (req, res) => {
  try {
    res.render("checkout.ejs", {});
  } catch (err) {
    return res.send(err.message);
  }
});

app.use("/payment", async (req, res) => {
  res.render("payment.ejs", {});
});

// Google Auth

// app.use(passport.initialize());

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (user, callback) {
  callback(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/auth/google/failure",
//   }),
//   (req, res) => {
//     res.render("landingPage", {
//       user: req.user.user,
//       token: req.user.token,
//     });
//   }
// );

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/google/success", (req, res) => {
  // res.render("landingPage", {
  //   user: req.user.user,
  //   token: req.user.token,
  // });
  res.status(201).send({ user: req.user?.user, token: req.user?.token });
});

app.get("/auth/google/failure", (req, res) => {
  return res.send("Failure");
});

// Connecting with port
app.listen(process.env.PORT || 3333, async () => {
  try {
    await connect();
    console.log(`Listening to the port ${process.env.PORT || 3333}`);
  } catch (error) {
    console.log("Database is not connected");
    console.log(error.message);
  }
});
