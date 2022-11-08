const Wishlist = require("../models/Wishlist.js");
const express = require("express");
const router = express.Router();

router.post("/create", async function (req, res) {
  try {
    const wishlist = new Wishlist({
      user_id: req.body.user_id,
      stocks: [],
    });

    await wishlist.save();
    res.status(201).json({ success: true, result: wishlist });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});
router.patch("/addToWishlist", async function (req, res) {
  try {
    const wishlist = await Wishlist.findById(req.body.wishlist_id);
    await wishlist.stocks.push(req.body.company);
    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

module.exports = router;
