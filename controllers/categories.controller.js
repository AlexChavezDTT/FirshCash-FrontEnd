const Categories = require("../models/categories.model");
const nsrestlet = require('nsrestlet');
const { accountSettingsPROD } = require('../config/nsuite');

exports.createCategories = (req, res) => {
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_categotias_gastos`
	}
	const categoriesObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	categoriesObj.get({ user: process.env.USER_NS }).then(function (body) {
		const objBody = body;
		for (let i in objBody) {
			Categories.findOne({ internalid: objBody[i].internalid }).then(function (body) {
				console.log("body.length", body.internalid);
				console.log("body.hasOwnProperty('internalid')", 'internalid' in body);
				if (body == null) {
					const catObj = new Categories({
						internalid: objBody[i].internalid,
						name: objBody[i].name,
						subsidiary: objBody[i].subsidiary,
						name_subsidiary: objBody[i].name_subsidiary,
						expenseAccount: objBody[i].expenseAccount,
						name_expenseAccount: objBody[i].name_expenseAccount
					});
					catObj.save().then(doc => {
						console.log("Save ✅:", doc);
					}).catch(err => {
						console.log("Error 😱:", err)
					});
				} else if ('internalid' in body) {
					Categories.updateOne({ internalid: objBody[i].internalid }, objBody[i]).then(function (body) {
						console.log("Updated ✅:", body);
					}).catch(function (error) {
						console.log("Error 😱:", err)
					});
				}
			})
		}
		res.status(200);
		res.send({ "message": "Get categories", "code": "200", "Categorias": objBody });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}

exports.listCategories = (req, res) => {
	const sub = req.params.subsidiary;
	Categories.find({ subsidiary: sub }).then((body) => {
		res.status(200);
		res.send({ "message": "Get categories", "code": "200", "Categorias": body });
	}).catch((error) => {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Ocurrio un error", "code": "500", "error": error });
	})
}
