const mongoose = require("mongoose");

const DeparmentSchema = new mongoose.Schema({
	internalid: {
		type: Number
	},
	name: {
		type: String
	},
	subsidiary: [{ id: { type: Number } }],
	subsidiary_name: {
		type: String
	}
});

const Deparments = mongoose.model('Deparments', DeparmentSchema);

module.exports = Deparments;