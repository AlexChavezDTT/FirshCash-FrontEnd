const url = process.env.URL_API;

module.exports = app => {
	const categories = require("../controllers/categories.controller");

	app.get(`${url}/categories/new`, categories.createCategories);
	app.get(`${url}/categories/:subsidiary`, categories.listCategories);
};