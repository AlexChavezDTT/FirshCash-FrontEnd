const Locations = require("../models/locations.model");
const nsrestlet = require('nsrestlet');
const { accountSettingsPROD } = require('../config/nsuite');

exports.createLocations = (req, res) => {
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_ubicaciones`
	}
	const locationObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	locationObj.get({ user: process.env.USER_NS }).then(function (body) {
		const objBody = body;
		for (let i in objBody) {
			Locations.findOne({ internalid: objBody[i].internalid }).then(function (body) {
				if (body == null) {
					const locObj = new Locations({
						internalid: objBody[i].internalid,
						name: objBody[i].name,
						subsidiary: objBody[i].subsidiary
					});
					locObj.save().then(doc => {
						console.log("Save ✅:", doc);
					}).catch(err => {
						console.log("Error 😱:", err)
					});
				} else if (body.length > 0) {
					Locations.updateOne({ internalid: objBody[i].internalid }, objBody[i]).then(function (body) {
						console.log("Updated ✅:", body);
					}).catch(function (error) {
						console.log("Error 😱:", err)
					});
				}
			})
		}
		res.status(200);
		res.send({ "message": "Get ubicaciones", "code": "200", "Ubicaciones": objBody });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}