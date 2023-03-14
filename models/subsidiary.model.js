const mongoose = require("mongoose");

const SubsidiarySchema = new mongoose.Schema({
	internalid: {
		type: Number
	},
	name: {
		type: String
	}
});

const Subsidiary = mongoose.model('Subsidiary', SubsidiarySchema);

module.exports = Subsidiary;