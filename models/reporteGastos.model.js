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
	},
	entity_id: {
		type: Number
	},
	supervisor: {
		type: Number
	},
	anticipo: {
		type: Boolean
	},
	cancelacion: {
		type: Boolean
	}
});

const Reporte = mongoose.model('Expense_Report', reporteGastosShema);

module.exports = Reporte;