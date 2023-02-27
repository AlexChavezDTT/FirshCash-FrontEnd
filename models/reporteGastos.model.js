const mongoose = require("mongoose");

const reporteGastosShema = new mongoose.Schema({
	internalid: {
		type: Number
	},
	transactionnumber: {
		type: String
	},
	trandate: {
		type: Date
	},
	memo: {
		type: String
	},
	amount: {
		type: Number
	},
	statusref: {
		type: String
	},
	entity: {
		type: String
	}
});

const Reporte = mongoose.model('Expense_Report', reporteGastosShema);

module.exports = Reporte;