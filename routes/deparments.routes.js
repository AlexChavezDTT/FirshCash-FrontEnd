const url = process.env.URL_API;

module.exports = app => {
	const deparments = require("../controllers/deparment.controller");

	app.get(`${url}/deparments/new`, deparments.createDeparments);
	app.get(`${url}/deparments/:subsidiary`, deparments.listDeparments);
};