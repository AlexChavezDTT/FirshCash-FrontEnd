const url = process.env.URL_API;

module.exports = app => {
	const taxes = require("../controllers/taxtyoecodes.controller");

	app.post(`${url}/taxes/news`, taxes.createTaxes);
	app.get(`${url}/taxes/:country`, taxes.listTax);
	app.get(`${url}/taxes/code/:idtype`, taxes.listTaxByCode);
};