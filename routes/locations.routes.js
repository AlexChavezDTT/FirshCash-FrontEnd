const url = process.env.URL_API;

module.exports = app => {
	const locations = require("../controllers/locations.controller");

	app.get(`${url}/locations/new`, locations.createLocations);
};