const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stock = new Schema(
	{
		price: Number,
        company_name: String
	},
	{
		timestamps: true,
	}
);

const Stock = mongoose.model("Stock", stock);
module.exports = Stock;