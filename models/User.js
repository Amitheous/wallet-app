const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	wallet: [
		{
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
		}
	]
});

module.exports = User = mongoose.model("users", UserSchema);
