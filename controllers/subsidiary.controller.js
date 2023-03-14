const Subsidiary = require("../models/subsidiary.model");
const nsrestlet = require('nsrestlet');
const { accountSettingsPROD } = require('../config/nsuite');

exports.createSubsidiarys = (req, res) => {
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_subsidiarias`
	}
	const subsidiaryObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	subsidiaryObj.get({ user: process.env.USER_NS }).then(function (body) {
		const objBody = body;
		for (let i in objBody) {
			Subsidiary.findOne({ internalid: objBody[i].internalid }).then(function (body) {
				if (body == null) {
					const subObj = new Subsidiary({
						internalid: objBody[i].internalid,
						name: objBody[i].name
					});
					subObj.save().then(doc => {
						console.log("Save ✅:", doc);
					}).catch(err => {
						console.log("Error 😱:", err)
					});
				} else if ('internalid' in body) {
					Subsidiary.updateOne({ internalid: objBody[i].internalid }, objBody[i]).then(function (body) {
						console.log("Updated ✅:", body);
					}).catch(function (error) {
						console.log("Error 😱:", err)
					});
				}
			})
		}
		res.status(200);
		res.send({ "message": "Subsidiarias actualizadas", "code": "200", "Subsidiarias": objBody });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error.", "code": "500", "error": error });
	})
}

exports.getAllSubsidiarys = (req, res) => {
	Subsidiary.find({}).then(function (doc) {
		res.status(200);
		res.send({ "message": "Lista de subsidiarias", "code": "200", "Subsidiarias": doc });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error.", "code": "500", "error": error });
	})
}

exports.getOneSubsidiarys = (req, res) => {
	const id = req.params.internalid;
	Subsidiary.find({ internalid: id }).then(function (doc) {
		res.status(200);
		res.send({ "message": "Lista de subsidiarias", "code": "200", "Subsidiarias": doc });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error.", "code": "500", "error": error });
	})
}