const Employees = require("../models/employees.model");
const nsrestlet = require('nsrestlet');
const { accountSettingsPROD } = require('../config/nsuite');

exports.createEmployees = (req, res) => {
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_empleados`
	}
	const employeesObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	employeesObj.get({ user: "jaime" }).then(function (body) {
		const objBody = body;
		console.log(objBody.length);
		Employees.deleteMany().then(doc => {
			for (let i in objBody) {
				const employeeObj = new Employees({
					internalid: objBody[i].internalid,
					entityid: objBody[i].entityid,
					email: objBody[i].email,
					custentity_fc_password_integration: objBody[i].custentity_fc_password_integration,
					subsidiary: objBody[i].subsidiary,
					location: objBody[i].location
				});
				employeeObj.save().then(doc => {
					console.log("Save ✅:", doc);
				}).catch(err => {
					console.log("Error 😱:", err)
				});
			}
		}).catch(err => {
			console.log(err);
		});
		res.status(200);
		res.send({ "message": "Get employees", "code": "200", "Employees": body });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Some error ocurred.", "code": "500", "error": error });
	})
}

exports.login = (req, res) => {
	const email = req.body.email;
	const password = req.body.custentity_fc_password_integration;
	console.log("email", email);
	console.log("password", password);
	Employees.findOne({ email: email, custentity_fc_password_integration: password }).then(doc => {
		console.log(doc);
		res.status(200);
		res.send({ "message": "Login", "code": "200", "Employee": doc });
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send({ "message": "Some error ocurred.", "code": "500", "error": err });
	})
}

exports.getEmployees = (req, res) => {
	Employees.find({}).then(doc => {
		console.log(doc);
		res.status(200);
		res.send({ "message": "Login", "code": "200", "Employees": doc });
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send({ "message": "Some error ocurred.", "code": "500", "error": err });
	})
}