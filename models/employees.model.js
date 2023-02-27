const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
	internalid: {
		type: Number
	},
	entityid: {
		type: String
	},
	email: {
		type: String
	},
	custentity_fc_password_integration: {
		type: String
	},
	subsidiary: {
		type: Number
	},
	location: {
		type: Number
	}
});

const Employees = mongoose.model('Employees', EmployeeSchema);

module.exports = Employees;