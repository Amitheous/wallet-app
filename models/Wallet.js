const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	title: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	income: [
		{
			date: {
				type: Date
			},
			category: {
				type: String
			},
			amount: {
				type: Number
			},
			note: {
				type: String
			}
		}
	],
	expenses: [
		{
			date: {
				type: Date
			},
			category: {
				type: String
			},
			amount: {
				type: Number
			},
			note: {
				type: String
			}
		}
	],
	totalIncome: {
		type: Number
	},
	totalExpenses: {
		type: Number
	}
});

module.exports = Wallet = mongoose.model("wallets", WalletSchema);
