const url = process.env.URL_API;

module.exports = app => {
	const nexus = require("../controllers/nexus.controller");

	app.post(`${url}/nexus/news`, nexus.createNexus);
	app.get(`${url}/nexus`, nexus.listNexus);
};