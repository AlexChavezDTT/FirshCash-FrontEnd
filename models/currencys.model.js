const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
	internalid: {
		type: Number
	},
	name: {
		type: String
	},
	symbol: {
		type: String
	},
	exchangerate: {
		type: Number
	}
});

const Currencys = mongoose.model('Currencys', CurrencySchema);

module.exports = Currencys;