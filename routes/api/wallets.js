const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateWalletInput = require("../../validation/wallet");
const validateExpenseInput = require("../../validation/expense");
const validateIncomeInput = require("../../validation/income");

const Wallet = require("../../models/Wallet");

// @route   POST api/wallets
// @desc    Create or edit wallet
// @access Private
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validateWalletInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}
		// Get Fields
		const walletFields = {};
		walletFields.user = req.user.id;
		if (req.body.title) walletFields.title = req.body.title;
		if (req.body.type) walletFields.type = req.body.type;

		Wallet.findOne({
			user: req.user.id
		}).then(wallet => {
			if (wallet) {
				// Editing wallet
				Wallet.findOneAndUpdate(
					{
						user: req.user.id
					},
					{
						$set: walletFields
					},
					{
						new: true
					}
				).then(wallet => res.json(wallet));
			} else {
				// Create a new wallet
				new Wallet(walletFields).save().then(wallet => res.json(wallet));
			}
		});
	}
);

// @route   GET api/wallets/
// @desc    Get wallets by user id
// @access  Private
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};
		Wallet.findOne({ user: req.user.id })
			.then(wallet => {
				if (!wallet) {
					errors.nowallet = "there are no wallets";
					return res.status(404).json(errors);
				}
				res.json(wallet);
			})
			.catch(err => res.json(err));
	}
);

// @route   POST api/wallets/expense/:id
// @desc    Add an expense
// @access  Private
router.post(
	"/expense/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validateExpenseInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Wallet.findById(req.params.id)
			.then(wallet => {
				const newExpense = {
					category: req.body.category,
					amount: req.body.amount,
					note: req.body.note,
					user: req.user.id
				};

				// Add to expenses array
				wallet.expenses.unshift(newExpense);
				// Recalculate Total Income
				let newArray;
				newArray = wallet.expenses.map(expense => expense.amount);
				wallet.totalExpenses = newArray.reduce((a, b) => a + b);
				wallet.totalExpenses = wallet.totalExpenses.toFixed(2);

				wallet.save().then(wallet => res.json(wallet));
			})
			.catch(err =>
				res.status(404).json({
					walletnotfound: "No wallet found"
				})
			);
	}
);

// @route   POST api/wallets/income/:id
// @desc    Add income
// @access  Private
router.post(
	"/income/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validateExpenseInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Wallet.findById(req.params.id)
			.then(wallet => {
				const newExpense = {
					category: req.body.category,
					amount: req.body.amount,
					note: req.body.note,
					user: req.user.id
				};

				// Add to income array
				wallet.income.unshift(newExpense);
				// Recalculate Total Income
				let newArray;
				newArray = wallet.income.map(income => income.amount);
				wallet.totalIncome = newArray.reduce((a, b) => a + b);
				wallet.totalIncome = wallet.totalIncome.toFixed(2);

				wallet.save().then(wallet => res.json(wallet));
			})
			.catch(err =>
				res.status(404).json({
					walletnotfound: "No wallet found"
				})
			);
	}
);

// @route   DELETE api/wallets/income/:id/:income_id
// @desc    Delete income from wallet
// @access  Private
router.delete(
	"/income/:id/:income_id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Wallet.findById(req.params.id)
			.then(wallet => {
				// Check for income
				if (
					wallet.income.filter(
						income => income._id.toString() === req.params.income_id
					).length === 0
				) {
					return res.status(404).json({
						expensenotfound: "This income item does not exist"
					});
				}

				const removeIndex = wallet.income
					.map(item => item._id.toString())
					.indexOf(req.params.income_id);

				// Splice from array
				wallet.income.splice(removeIndex, 1);
				// Recalculate Total Income
				let newArray;
				newArray = wallet.income.map(income => income.amount);
				wallet.totalIncome = newArray.reduce((a, b) => a + b);
				wallet.totalIncome = wallet.totalIncome.toFixed(2);

				wallet.save().then(wallet => res.json(wallet));
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   DELETE api/wallets/expense/:id/:expense_id
// @desc    Delete expense from wallet
// @access  Private
router.delete(
	"/expense/:id/:expense_id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		Wallet.findById(req.params.id)
			.then(wallet => {
				// Check for expense
				if (
					wallet.expenses.filter(
						expense => expense._id.toString() === req.params.expense_id
					).length === 0
				) {
					return res.status(404).json({
						expensenotfound: "Expense does not exist"
					});
				}

				const removeIndex = wallet.expenses
					.map(item => item._id.toString())
					.indexOf(req.params.expense_id);

				// Splice from array
				wallet.expenses.splice(removeIndex, 1);
				// Recalculate Total Income
				let newArray;
				newArray = wallet.expenses.map(expense => expense.amount);
				wallet.totalExpenses = newArray.reduce((a, b) => a + b);
				wallet.totalExpenses = wallet.totalExpenses.toFixed(2);

				wallet.save().then(wallet => res.json(wallet));
			})
			.catch(err => res.status(404).json(err));
	}
);

module.exports = router;
