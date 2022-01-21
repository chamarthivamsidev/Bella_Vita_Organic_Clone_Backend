const express = require("express");

const Bag = require("../models/bag.model");

// const crudController = require("./crud.controller");

const router = express.Router();

router.get("/cart", async (req, res) => {
  let bag = await Bag.find().lean().exec();
    let totalval=0
    for(let i=0;i<bag.length;i++){
      totalval +=bag[i].price*bag[i].quantity;
    }
  return res.send("hello")
  // return res.render("cart",{bag, totalval});
});

// router.get("/:id/edit", async (req, res) => {
//   // /users/:id/edit => edit form
//   try {
//     const user = await Bag.findById(req.params.id).lean().exec();

//     return res.render("users/edit", { user: user });
//   } catch (err) {
//     console.log(err.message);
//   }
// });

router.delete("/cart/:id/delete", async (req, res) => {
  await Bag.findByIdAndDelete(req.params.id).lean().exec();
    let bag = await Bag.find().lean().exec();
    // 6 users => deleted 1 => when we get all users we get 5 => redirect to index with 5 users
    bag=[bag]
    return res.render("cart", {bag});
});


// /users
// router.post("", crudController(Bag).post);
// router.get("", crudController(Bag, "users/index").get);
// router.get("/:id", crudController(Bag).getOne);
// router.patch("/:id", crudController(Bag, "users/index").updateOne);
// router.delete("/:id", crudController(Bag).deleteOne);

module.exports = router;