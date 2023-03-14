const url = process.env.URL_API;

module.exports = app => {
	const subsidiaria = require("../controllers/subsidiary.controller");

	app.post(`${url}/sub/new`, subsidiaria.createSubsidiarys);
	app.get(`${url}/sub`, subsidiaria.getAllSubsidiarys);
	app.get(`${url}/sub/:internalid`, subsidiaria.getOneSubsidiarys);
};