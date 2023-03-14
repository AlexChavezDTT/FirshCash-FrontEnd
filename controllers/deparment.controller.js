const Deparments = require("../models/departments.model");
const nsrestlet = require('nsrestlet');
const { accountSettingsPROD } = require('../config/nsuite');

exports.createDeparments = (req, res) => {
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_departamentos`
	}
	const deparmentObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	deparmentObj.get({ user: process.env.USER_NS }).then(function (body) {
		const objBody = body;
		let objSubId = [];
		for (let i in objBody) {
			Deparments.findOne({ internalid: objBody[i].internalid }).then(function (body) {
				if (body == null) {
					const locObj = new Deparments({
						internalid: objBody[i].internalid,
						name: objBody[i].name,
						subsidiary: objBody[i].subsidiary,
						subsidiary_name: objBody[i].subsidiary_name,
					});
					locObj.save().then(doc => {
						console.log("Save ✅:", doc);
					}).catch(err => {
						console.log("Error 😱:", err)
					});
				} else if ('internalid' in body) {
					Deparments.updateOne({ internalid: objBody[i].internalid }, objBody[i]).then(function (body) {
						console.log("Updated ✅:", body);
					}).catch(function (error) {
						console.log("Error 😱:", error)
					});
				}
			})
		}
		res.status(200);
		res.send({ "message": "Get deparments", "code": "200", "Departamentos": objBody });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}

exports.listDeparments = (req, res) => {
	const sub = req.params.subsidiary;
	Deparments.find({ 'subsidiary.id': sub }).then((body) => {
		res.status(200);
		res.send({ "message": "Get Deparments", "code": "200", "Deparmentos": body });
	}).catch((error) => {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}