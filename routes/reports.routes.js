const url = "/api/mongo";

module.exports = app => {
	const reports = require("../controllers/reporteGastos.controller");

	app.post(`${url}/reports/new`, reports.createReports);
	app.post(`${url}/report`, reports.getOnereport);
	app.put(`${url}/report`, reports.updateReport);
	app.post(`${url}/report/create`, reports.createReport);
	app.get(`${url}/report/filter/employee/:ord/:entity/:start_date/:finish_date/:status`, reports.filterByOrd);
	app.get(`${url}/report/filter/:entity/:start_date/:finish_date/:status`, reports.filterByEmployeeAndDates);
	app.get(`${url}/report/list`, reports.getList);
};