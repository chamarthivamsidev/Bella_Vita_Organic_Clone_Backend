const express = require("express");

const router = express.Router();
const Addtocart = require("../models/addtocart");

router.post("/addtocart", async (req, res) => {
    try{
const addtocart = await Addtocart.create({
    user_id: req.body.user_id,
    products_id: req.body.products_id,
})
return res.status(200).send(addtocart)
    }catch(err){
        return res.status(500).send(err.message)
    }
});
