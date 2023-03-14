const Reporte = require("../models/reporteGastos.model");
const nsrestlet = require('nsrestlet');
const { accountSettingsPROD } = require('../config/nsuite');
const moment = require('moment');

exports.createReports = (req, res) => {
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_reporte_gastos`
	}
	const reportsObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	reportsObj.get({ user: "jaime" }).then(function (body) {
		const objBody = body;
		console.log(objBody.length);
		Reporte.deleteMany().then(doc => {
			for (let i in objBody) {
				console.log(moment(objBody[i].trandate, "YYYY-MM-DD"));
				const reporteObj = new Reporte({
					internalid: objBody[i].internalid,
					transactionnumber: objBody[i].transactionnumber,
					trandate: moment(objBody[i].trandate, "YYYY-MM-DD"),
					memo: objBody[i].memo,
					amount: objBody[i].amount,
					statusref: objBody[i].statusref,
					entity: objBody[i].entity,
					entity_id: objBody[i].entity_id,
					supervisor: objBody[i].supervisor,
					anticipo: objBody[i].anticipo,
					cancelacion: objBody[i].cancelacion,
				});
				reporteObj.save().then(doc => {
					console.log("Save ✅:", doc);
				}).catch(err => {
					console.log("Error 😱:", err)
				});
			}
		}).catch(err => {
			console.log(err);
		});
		Reporte.find().sort({ internalid: -1 }).then(doc => {
			console.log(doc);
			res.status(200);
			res.send({ "message": "Get reports", "code": "200", "Reports": doc });
		}).catch(err => {
			console.log(err);
			res.status(500);
			res.send({ "message": "Some error ocurred.", "code": "500", "error": err });
		})
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Some error ocurred.", "code": "500", "error": error });
	})
}

exports.getOnereport = (req, res) => {
	const id_report = req.body.id_busqueda;
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1&accion=consulta_detalle_reporte_gastos&id_busqueda=${id_report}`
	};
	const reportObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	reportObj.get({ user: "jaime" }).then(function (body) {
		const objBody = body;
		console.log(objBody);
		res.status(200);
		res.send({ "message": "Get report", "code": "200", "Report": body });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Some error ocurred.", "code": "500", "error": error });
	})
}

exports.updateReport = (req, res) => {
	const objPut = req.body;
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1`
	};
	const reportObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	reportObj.put(objPut).then(function (body) {
		const objBody = body.isSuccessful;
		console.log(objBody.isSuccessful);
		res.status(200);
		res.send({ "message": "Update report", "code": "200", "isSuccessful": objBody });
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Some error ocurred.", "code": "500", "error": error });
	})
}

exports.createReport = (req, res) => {
	const objPost = req.body;
	const urlRestlet = {
		url: `https://7674262.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=930&deploy=1`
	};
	const reportObj = nsrestlet.createLink(accountSettingsPROD, urlRestlet);
	reportObj.post(objPost).then(function (body) {
		const objBody = body;
		res.status(200);
		res.send(objBody);
	}).catch(function (error) {
		console.log("Error 😱:", error)
		res.status(500);
		res.send({ "message": "Some error ocurred.", "code": "500", "error": error });
	})
}

exports.filterByEmployee = (req, res) => {
	const entity = req.params.entity;
	if (entity == 0) {
		Reporte.find().then(doc => {
			console.log(doc);
			res.status(200);
			res.send({ "message": "Login", "code": "200", "Reports": doc });
		}).catch(err => {
			console.log(err);
			res.status(500);
			res.send({ "message": "Some error ocurred.", "code": "500", "error": err });
		})
	} else {
		Reporte.find({ entity: entity }).then(doc => {
			console.log(doc);
			res.status(200);
			res.send({ "message": "Login", "code": "200", "Reports": doc });
		}).catch(err => {
			console.log(err);
			res.status(500);
			res.send({ "message": "Some error ocurred.", "code": "500", "error": err });
		})
	}
}

exports.getList = (req, res) => {
	Reporte.find().then(doc => {
		console.log(doc);
		res.status(200);
		res.send({ "message": "Login", "code": "200", "Reports": doc });
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send({ "message": "Some error ocurred.", "code": "500", "error": err });
	})
}

exports.filterByOrd = (req, res) => {
	const ord = req.params.ord;
	const entity = req.params.entity;
	const start_date = req.params.start_date;
	const finish_date = req.params.finish_date;
	const estatus = req.params.status;
	let objfilter;
	let objSort;
	let estatusText;
	if (estatus == 1) {
		estatusText = "pendingSupApproval";
	}
	if (estatus == 2) {
		estatusText = "pendingAcctApproval";
	}
	if (entity == 0) {
		if (estatus == 0) {
			objfilter = { $and: [{ trandate: { $gt: new Date(start_date) } }, { trandate: { $lt: new Date(finish_date) } }] };
		} else {
			objfilter = { $and: [{ trandate: { $gt: new Date(start_date) } }, { trandate: { $lt: new Date(finish_date) } }, { statusref: estatusText }] };
		}
		if (ord == 0) {
			objSort = { internalid: -1 };
		} else if (ord == 1) {
			objSort = { internalid: 1 };
		}
	} else {
		if (estatus == 0) {
			objfilter = { $and: [{ entity_id: entity }, { trandate: { $gt: new Date(start_date) } }, { trandate: { $lt: new Date(finish_date) } }] };
		} else {
			objfilter = { $and: [{ entity_id: entity }, { trandate: { $gt: new Date(start_date) } }, { trandate: { $lt: new Date(finish_date) } }, { statusref: estatusText }] };
		}
		if (ord == 0) {
			objSort = { internalid: -1 };
		} else if (ord == 1) {
			objSort = { internalid: 1 };
		}
	}
	console.log("filter", objfilter);
	Reporte.find(objfilter).sort(objSort).then(doc => {
		console.log(doc);
		res.status(200);
		res.send({ "message": "List", "code": "200", "Reports": doc });
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send({ "message": "Some error ocurred.", "code": "500", "error": err });
	})
}

exports.filterByEmployeeAndDates = (req, res) => {
	const entity = req.params.entity;
	const start_date = req.params.start_date;
	const finish_date = req.params.finish_date;
	const estatus = req.params.status;
	let estatusText;
	let filter;
	if (entity == 0) {
		Reporte.find().then(doc => {
			console.log(doc);
			res.status(200);
			res.send({ "message": "Login", "code": "200", "Reports": doc });
		}).catch(err => {
			console.log(err);
			res.status(500);
			res.send({ "message": "Some error ocurred.", "code": "500", "error": err });
		})
	} else {
		if (estatus == 0) {
			filter = { $and: [{ entity_id: entity }, { trandate: { $gt: new Date(start_date) } }, { trandate: { $lt: new Date(finish_date) } }] };
		}
		if (estatus == 1) {
			estatusText = "pendingSupApproval";
			filter = { $and: [{ entity_id: entity }, { trandate: { $gt: new Date(start_date) } }, { trandate: { $lt: new Date(finish_date) } }, { statusref: estatusText }] };
		}
		if (estatus == 2) {
			estatusText = "pendingAcctApproval";
			filter = { $and: [{ entity_id: entity }, { trandate: { $gt: new Date(start_date) } }, { trandate: { $lt: new Date(finish_date) } }, { statusref: estatusText }] };
		}
		console.log("entro");
		console.log("filter", filter)
		Reporte.find(filter).then(doc => {
			console.log(doc);
			res.status(200);
			res.send({ "message": "Login", "code": "200", "Reports": doc });
		}).catch(err => {
			console.log(err);
			res.status(500);
			res.send({ "message": "Some error ocurred.", "code": "500", "error": err });
		})
	}
}