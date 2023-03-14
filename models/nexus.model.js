const mongoose = require("mongoose");

const NexusSchema = new mongoose.Schema({
	internalid: {
		type: Number
	},
	country: {
		type: String
	},
	taxagency: {
		type: Number
	},
	description: {
		type: String
	}
});

const Nexus = mongoose.model('Nexus', NexusSchema);
module.exports = Nexus;