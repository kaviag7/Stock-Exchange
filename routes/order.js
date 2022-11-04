const express = require("express");
const router = express.Router();
const api = require("../datasets/stockData.js");
const Order = require("../models/Order.js");
const User = require("../models/User.js");
const Wallet = require("../models/Wallet.js");
const axios = require("axios");
const getStockPrice = require("../datasets/stockPrice.js");

router.post("/create", async function (req, res) {
  try {
    const user = await User.findById(req.body.user_id);
    if (!user)
      throw {
        status: 404,
        message: "User not found",
      };

    const stockApi = api(req.body.company, process.env.API);
    const stockPrice = await axios
      .get(stockApi)
      .then((res) => getStockPrice(res));

    const wallet = await Wallet.findById(user.wallet);
    const walletBalance = wallet["balance"];

    if (
      walletBalance < stockPrice * req.body.quantity &&
      req.body.type === "BUY"
    )
      throw {
        status: 400,
        message: "Insufficient Wallet balance",
      };

    const order = await Order.create({
      user_id: req.body.user_id,
      stock: req.body.company,
      stock_price: stockPrice,
      quantity: req.body.quantity,
      order_type: req.body.type,
    });

    if (req.body.type === "BUY") {
        wallet.balance -= stockPrice * req.body.quantity;
    } else {
        wallet.balance += stockPrice * req.body.quantity;
    }

    await wallet.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
});

module.exports = router;
