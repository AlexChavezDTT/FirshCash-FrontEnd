const Nexus = require("../models/nexus.model");
const nsrestlet = require('nsrestlet');
const { accountSettingsPROD } = require('../config/nsuite');

exports.createNexus = (req, res) => {
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_nexus`
	}
	const nexusObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	nexusObj.get({ user: process.env.USER_NS }).then(function (body) {
		const objBody = body;
		for (let i in objBody) {
			Nexus.findOne({ internalid: objBody[i].internalid }).then(function (body) {
				if (body == null) {
					const locNexus = new Nexus({
						internalid: objBody[i].internalid,
						country: objBody[i].country,
						taxagency: objBody[i].taxagency,
						description: objBody[i].description
					});
					locNexus.save().then(doc => {
						console.log("Save ✅:", doc);
					}).catch(err => {
						console.log("Error 😱:", err)
					});
				} else if ('internalid' in body) {
					Nexus.updateOne({ internalid: objBody[i].internalid }, objBody[i]).then(function (body) {
						console.log("Updated ✅:", body);
					}).catch(function (error) {
						console.log("Error 😱:", error)
					});
				}
			})
		}
		res.status(200);
		res.send({ "message": "Get Nexus", "code": "200", "Nexus": objBody });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}

exports.listNexus = (req, res) => {
	Nexus.find({}).then((body) => {
		res.status(200);
		res.send({ "message": "Get Nexus", "code": "200", "Nexus": body });
	}).catch((error) => {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}