const Currencys = require("../models/currencys.model");
const nsrestlet = require('nsrestlet');
const { accountSettingsPROD } = require('../config/nsuite');

exports.createCurrencys = (req, res) => {
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_monedas`
	}
	const currencyObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	currencyObj.get({ user: process.env.USER_NS }).then(function (body) {
		const objBody = body;
		for (let i in objBody) {
			Currencys.findOne({ internalid: objBody[i].internalid }).then(function (body) {
				if (body == null) {
					const currObj = new Currencys({
						internalid: objBody[i].internalid,
						name: objBody[i].name,
						symbol: objBody[i].symbol,
						exchangerate: objBody[i].exchangerate,
					});
					currObj.save().then(doc => {
						console.log("Save ✅:", doc);
					}).catch(err => {
						console.log("Error 😱:", err)
					});
				} else if ('internalid' in body) {
					Currencys.updateOne({ internalid: objBody[i].internalid }, objBody[i]).then(function (body) {
						console.log("Updated ✅:", body);
					}).catch(function (error) {
						console.log("Error 😱:", err)
					});
				}
			})
		}
		res.status(200);
		res.send({ "message": "Monedas actualizadas", "code": "200", "Monedas": objBody });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}

exports.getAllCurrencys = (req, res) => {
	Currencys.find({}).then(function (doc) {
		res.status(200);
		res.send({ "message": "Lista de monedas", "code": "200", "Monedas": doc });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error.", "code": "500", "error": error });
	})
}