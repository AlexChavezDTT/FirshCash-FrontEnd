const Taxes = require("../models/taxtypecodes.model");
const nsrestlet = require('nsrestlet');
const { accountSettingsPROD } = require('../config/nsuite');

exports.createTaxes = (req, res) => {
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_taxtypes`
	}
	const taxesObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	taxesObj.get({ user: process.env.USER_NS }).then(function (body) {
		const objBody = body;
		for (let i in objBody) {
			Taxes.findOne({ internalid: objBody[i].internalid }).then(function (body) {
				if (body == null) {
					const taxObj = new Taxes({
						internalid: objBody[i].internalid,
						name: objBody[i].name,
						country: objBody[i].country,
						taxCodes: objBody[i].taxCodes,
					});
					taxObj.save().then(doc => {
						console.log("Save ✅:", doc);
					}).catch(err => {
						console.log("Error 😱:", err)
					});
				} else if ('internalid' in body) {
					Taxes.updateOne({ internalid: objBody[i].internalid }, objBody[i]).then(function (body) {
						console.log("Updated ✅:", body);
					}).catch(function (error) {
						console.log("Error 😱:", error)
					});
				}
			})
		}
		res.status(200);
		res.send({ "message": "Get taxes", "code": "200", "taxes": objBody });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}

exports.listTax = (req, res) => {
	const country = req.params.country;
	Taxes.find({ 'country': country }).then((body) => {
		res.status(200);
		res.send({ "message": "Get taxes", "code": "200", "taxes": body });
	}).catch((error) => {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}

exports.listTaxByCode = (req, res) => {
	const idType = req.params.idtype;
	Taxes.find({ 'internalid': idType }).then((body) => {
		res.status(200);
		res.send({ "message": "Get taxes", "code": "200", "taxes": body });
	}).catch((error) => {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}