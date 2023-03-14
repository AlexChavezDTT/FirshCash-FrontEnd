const mongoose = require("mongoose");

const TaxesSchema = new mongoose.Schema({
	internalid: {
		type: Number
	},
	name: {
		type: String
	},
	country: {
		type: Number
	},
	taxCodes: [{
		internalid: { type: Number },
		name: { type: String },
		rate: { type: Number }
	}],
});

const Taxes = mongoose.model('Taxes', TaxesSchema);

module.exports = Taxes;