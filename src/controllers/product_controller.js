const express = require("express");
const router = express.Router();
const Products = require("../models/products");

router.get("/", async (req, res) => {
  // try {
  //   const products = await Products.find().lean().exec();

  //   return res.render("products.ejs", { products: products });
  // } catch (err) {
  //   return res.status(500).send(err.message);
  // }
  return res.render("landingPage.ejs", {});
});
router.get("/api", async (req, res) => {
  let products = await Products.find().lean().exec();

  res.status(200).send(products);
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
