const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolio = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
        stocks: [{
            stock_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Stock",
            },
            amount_invested: Number,
            return: Number,
            net_quantity: {
                type: Number,
                min: 0,
            },
            bought_at:[{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            }]
        }],
        total_present_value: Number,
        amount_invested: Number,
	},
	{
		timestamps: true,
	}
);

const Portfolio = mongoose.model("Portfolio", portfolio);
module.exports = Portfolio;