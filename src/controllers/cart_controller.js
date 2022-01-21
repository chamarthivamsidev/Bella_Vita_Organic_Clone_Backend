const express = require("express");
const Bag = require("../models/cart.model");

// const crudController = require("./crud.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  let bag = await Bag.find().lean().exec();
    let totalval=0
    for(let i=0;i<bag.length;i++){
      totalval +=bag[i].Price*bag[i].Qty;
    }
  return res.render("cart",{bag, totalval});
});

// Api to delete the product and return updated list
router.get("/delete/:id", async (req, res) => {
  await Bag.findByIdAndDelete(req.params.id).lean().exec();
    let bag = await Bag.find().lean().exec();
    // 6 users => deleted 1 => when we get all users we get 5 => redirect to index with 5 users
    return res.status(200).send(bag);
});

// Api to update the product qty and return updated list
router.patch("/qty/:id", async (req, res) => {
  let bag= await await Bag.findByIdAndUpdate(req.params.id, { $inc: { Qty: 1}});
  
    return res.status(200).send(bag);
});



// /users
// router.post("", crudController(Bag).post);
// router.get("", crudController(Bag, "users/index").get);
// router.get("/:id", crudController(Bag).getOne);
// router.patch("/:id", crudController(Bag, "users/index").updateOne);
// router.delete("/:id", crudController(Bag).deleteOne);

module.exports = router;