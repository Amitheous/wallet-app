const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateWalletInput(data) {
	let errors = {};

	data.title = !isEmpty(data.title) ? data.title : "";
	data.type = !isEmpty(data.title) ? data.type : "";

	if (Validator.isEmpty(data.title)) {
		errors.title = "Wallet title is required";
	}
	if (Validator.isEmpty(data.type)) {
		errors.type = "Wallet type is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
