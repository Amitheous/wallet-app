const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.category = !isEmpty(data.category) ? data.category : "";
	data.amount = !isEmpty(data.amount) ? data.amount : "";

	if (Validator.isEmpty(data.category)) {
		errors.category = "Category field is required";
	}
	if (Validator.isEmpty(data.amount)) {
		errors.amount = "Amount field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
