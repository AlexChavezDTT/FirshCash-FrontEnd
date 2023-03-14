const url = process.env.URL_API;

module.exports = app => {
	const currencys = require("../controllers/currencys.controller");

	app.post(`${url}/currencys/new`, currencys.createCurrencys);
	app.get(`${url}/currencys`, currencys.getAllCurrencys);
};