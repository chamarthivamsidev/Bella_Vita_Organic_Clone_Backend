const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    return res.render("products.ejs", {});
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.get("/api", async (req, res) => {
  try {
    let products = await Product.find().lean().exec();
    // let products = await User.find().lean().exec();
    // let products = ["apple", "ball"];
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(err.message);
  }
});

router.post("/products", async (req, res) => {
  try {
    console.log("run");
    const product = await Products.create(req.body);
    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
