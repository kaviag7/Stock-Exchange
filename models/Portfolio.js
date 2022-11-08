const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolio = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
        stocks: {},
        amount_invested: Number,
        quantity: Number
	},
	{
		timestamps: true,
	}
);

const Portfolio = mongoose.model("Portfolio", portfolio);
module.exports = Portfolio;