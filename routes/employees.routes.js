const url = "/api/mongo";

module.exports = app => {
	const employees = require("../controllers/employees.controller.js");

	app.post(`${url}/employees/new`, employees.createEmployees);
	app.post(`${url}/login`, employees.login);
	app.get(`${url}/employees`, employees.getEmployees);
};