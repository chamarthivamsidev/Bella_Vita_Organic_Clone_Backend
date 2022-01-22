const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    let createdUser = await User.create(req.body);
    res.send({ status: true });
  } catch (err) {
    res.send({ status: false, error });
  }
});

module.exports = router;
