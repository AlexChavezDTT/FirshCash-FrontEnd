const mongoose = require("mongoose");

const LocationsSchema = new mongoose.Schema({
	internalid: {
		type: Number
	},
	name: {
		type: String
	},
	subsidiary: {
		type: String
	}
});

const Locations = mongoose.model('Locations', LocationsSchema);

module.exports = Locations;