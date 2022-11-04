const Portfolio = require("../models/Portfolio.js");
const express = require("express");
const router = express.Router();

router.post("/create", async function (req, res) {
  try {
    const portfolio = new Portfolio({
      user_id: req.body.user_id,
    });

    await portfolio.save();
    res.status(201).json({ success: true, result: portfolio });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

module.exports = router;
