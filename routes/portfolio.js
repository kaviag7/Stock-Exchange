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
router.patch("/update", async function (req, res) {
  try {
    const portfolio = await Portfolio.findById(req.body.p_id);

    if (req.body.type === "BUY") {
      if (!portfolio.stocks || !portfolio.stocks[req.body.company]) {
        if (!portfolio.stocks) portfolio.stocks = {};
        const newStock = {
          quantity: req.body.quantity,
          avg_price: req.body.price,
        };
        // portfolio.stocks[req.body.company] = newStock;
      } else {
        const stock = portfolio.stocks[req.body.company];
        const newQuantity = stock.quantity + req.body.quanity;
        const newAvgPrice =
          (stock.quantity * stock.avg_price +
            req.body.quantity * req.body.price) /
          newQuantity;
        portfolio.stocks[req.body.company] = {
          quantity: newQuantity,
          avg_price: newAvgPrice,
        };
      }
    } else {
      const stock = portfolio.stocks[req.body.company];
      if (stock.quantity == req.body.quantity) {
        delete portfolio.stocks[req.body.company];
      } else {
        const newQuantity = stock.quantity - req.body.quantity;
        const newAvgPrice =
          (stock.quantity * stock.avg_price -
            req.body.quantity * req.body.price) /
          newQuantity;
        portfolio.stocks[req.body.company] = {
          quantity: newQuantity,
          avg_price: newAvgPrice,
        };
      }
    }
    await portfolio.save();
    res.status(200).json(portfolio);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

module.exports = router;
