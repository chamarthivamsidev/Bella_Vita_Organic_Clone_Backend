const express = require("express");
const router = express.Router();
const Products = require("../models/products");

router.get("/", async (req, res) => {
  try {
    return res.render("products.ejs", {});
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.get("/api", async (req, res) => {
  try {
    let products = await Products.find().lean().exec();

    res.status(200).send(products);
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
