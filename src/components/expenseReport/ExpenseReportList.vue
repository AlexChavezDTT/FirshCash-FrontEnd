<template>
	<div class="container-fluid mt-3">
		<div v-if="loader">
			<div class="row" style="width: 100%; margin-top: 50px;">
				<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
					<center>
						<span class="loader"></span>
					</center>
					<h5 style="text-align: center;">Por favor espere...</h5>
				</div>
			</div>
		</div>
		<div v-if="loader_report">
			<div class="row" style="width: 100%; margin-top: 50px;">
				<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
					<center>
						<span class="loader_report"></span>
					</center>
					<h5 style="text-align: center;">Por favor espere...</h5>
				</div>
			</div>
		</div>
		<div v-if="!loader && !loader_report">
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
					<h2><font-awesome-icon icon="fa-solid fa-money-bill-1-wave" /> Reporte de gastos</h2>
				</div>
				<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 justify-content-end text-end">
					<!-- <button class="btn btn-link" @click="getListExpenseReports" style="color: #041688;"><font-awesome-icon
							icon="fa-solid fa-rotate" class="me-1" />
						Sincronizar reportes de
						gastos</button> -->
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
					<div class="card">
						<div class="card-header">
							Filtros
						</div>
						<div class="card-body">
							<div class="row form-filtros">
								<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
									<div class="inputControl">
										<label for="txtEmpleado">Empleado</label>
										<select class="form-select" name="txtEmpleado" aria-label="Default select example"
											@change="filterEmployees" v-model="selectedFilterEmployee">
											<option selected value="0">Todos</option>
											<option :value="employee.internalid" v-for="employee in listEmployees"
												:key="employee.internalid">{{ employee.entityid }}</option>
										</select>
									</div>
								</div>
								<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
									<div class="inputControl">
										<label for="txtEmpleado">Estatus</label>
										<select class="form-select" name="txtEmpleado" aria-label="Default select example"
											@change="filterStatus" v-model="selectedFilterEstatus">
											<option selected value="0">Todos</option>
											<option value="1">PENDING SUPERVISOR APPROVAL</option>
											<option value="2">PENDING ACCOUNTING APPROVAL</option>
											<!-- <option selected value="3">REJECT</option> -->
										</select>
									</div>
								</div>
								<!-- <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
									<div class="inputControl">
										<label for="txtEstatus">Estatus</label>
										<select class="form-select" name="txtEstatus" aria-label="Default select example">
											<option selected>Todos</option>
											<option value="1">Creado</option>
											<option value="2">Aprobado</option>
											<option value="3">Cancelado</option>
										</select>
									</div>
								</div> -->
								<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
									<div class="inputControl">
										<label for="txtFechaInicio">Fecha de inicio</label>
										<input type="date" name="txtFechaInicio" class="form-control form-control-lg"
											v-model="startDateFilter" />
									</div>
								</div>
								<div class="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
									<div class="inputControl">
										<label for="txtFechaFinalizado">Fecha de finalizado</label>
										<input type="date" name="txtFechaFinalizado" class="form-control form-control-lg"
											v-model="finishDateFilter" />
									</div>
								</div>
								<div class="col-sm-12 col-md-2 col-lg-3 col-xl-3 col-xxl-3 d-flex align-items-center">
									<!-- <label for="txtEmail" class="form-label" style="color:#fff">Acciones</label> -->
									<button class="btn btn-primary" style="margin-top: 4%; margin-right: 10px;"
										@click="filterList"><font-awesome-icon icon="fa-solid fa-magnifying-glass"
											class="me-1" /> Filtrar</button>
									<button class="btn btn-primary" style="margin-top: 4%; margin-right: 10px;"
										@click="handleClickNewExpenseReport"><font-awesome-icon
											icon="fa-solid fa-circle-plus" class="me-1" /> Nuevo reporte de
										gastos</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
					<div class="header-table">
						<font-awesome-icon icon="fa-solid fa-file-csv" class="icon-header-table icon-csv"
							data-bs-toggle="tooltip" data-bs-placement="top" title="Exportar a CSV" />
						<font-awesome-icon icon="fa-solid fa-file-excel" class="icon-header-table icon-xml"
							data-bs-toggle="tooltip" data-bs-placement="top" title="Exportar s Excel" />
						<font-awesome-icon icon="fa-solid fa-file-pdf" class="icon-header-table icon-pdf"
							data-bs-toggle="tooltip" data-bs-placement="top" title="Exportar a PDF" />
						<font-awesome-icon icon="fa-solid fa-print" class="icon-header-table icon-print v-line"
							data-bs-toggle="tooltip" data-bs-placement="top" title="Imprimir" />

						<div class="row header-table-float">
							<label for="colFormLabel" class="col-sm-4 col-form-label form-control-header-text">ORDENACIÓN
								RAPIDA</label>
							<div class="col-sm-8">
								<select class="form-select form-control-header" aria-label="Default select example"
									@change="filterOrdenacion" v-model="selectedFilterOrdenacion">
									<option value="0">Primero recientes</option>
									<option value="1">Primero antiguos</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 table-responsive">
					<table class="table table-striped table-bordered">
						<thead style="background: #e5e5e5">
							<tr>
								<th scope="col" class="text-center"></th>
								<th scope="col">VER</th>
								<th scope="col" class="text-center">ID NS</th>
								<th scope="col" class="text-center">EMPLEADO</th>
								<th scope="col" class="text-center">IDENTIFICADOR</th>
								<th scope="col" class="text-center">FECHA</th>
								<!-- <th scope="col" class="text-center">TOTAL</th> -->
								<th scope="col" class="text-center">ESTATUS</th>
								<th scope="col" class="text-center">NOTA</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(report, index) in listReports" :key="report.internalid">
								<td scope="row" class="text-center"
									v-if="report.entity_id === userObj.internalid || report.supervisor === userObj.internalid">
									{{ index + 1 }}</td>
								<th class="btn-ver" @click="handleClickList(report.internalid)"
									v-if="report.entity_id === userObj.internalid || report.supervisor === userObj.internalid">
									VER</th>
								<td class="text-center"
									v-if="report.entity_id === userObj.internalid || report.supervisor === userObj.internalid">
									{{ report.internalid }}</td>
								<td class="text-center"
									v-if="report.entity_id === userObj.internalid || report.supervisor === userObj.internalid">
									{{ report.entity }}</td>
								<td class="text-center"
									v-if="report.entity_id === userObj.internalid || report.supervisor === userObj.internalid">
									{{ report.transactionnumber }}</td>
								<td class="text-center"
									v-if="report.entity_id === userObj.internalid || report.supervisor === userObj.internalid">
									{{ report.trandate }}</td>
								<!-- <td class="text-center"
									v-if="report.entity_id === userObj.internalid || report.supervisor === userObj.internalid">
									${{ report.amount }}</td> -->
								<td class="text-center"
									v-if="report.entity_id === userObj.internalid || report.supervisor === userObj.internalid">
									<span class="badge rounded-pill"
										:class="{ 'bg-success': report.statusref === 'approvedByAcctOverride', 'bg-info': report.statusref === 'approvedByAcct', 'bg-secondary': report.statusref === 'pendingSupApproval', 'bg-warning': report.statusref === 'pendingAcctApproval', 'bg-danger': report.cancelacion }"
										style="font-size: 16px; width: 250px;">
										{{ report.cancelacion ? "Rechazado" : report.statusref }}
									</span>
								</td>
								<td class="text-center"
									v-if="report.entity_id === userObj.internalid || report.supervisor === userObj.internalid">
									{{ report.memo }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { computed, onMounted, onBeforeMount } from "@vue/runtime-core";
import axios from 'axios';

export default {
	name: "ExpenseReportList",
	setup(props) {
		const urlApi = process.env.VUE_APP_URL_API_LOCAL;
		const store = useStore();
		const showList = ref(computed(() => store.state.showList));
		const obj = ref(computed(() => store.state.infoList));
		const userObj = ref(computed(() => store.state.user));
		const listReports = ref(computed(() => store.state.objListReports));
		const listEmployees = ref(computed(() => store.state.infoEmployees));
		const loader = ref(false);
		const loader_report = ref(false);
		const selectedFilterEmployee = ref("0");
		const selectedFilterEstatus = ref("0");
		const selectedFilterOrdenacion = ref("0");
		const startDateFilter = ref("");
		const finishDateFilter = ref("");

		onMounted(() => {
			getListReports();
		});

		const handleClickList = async (id) => {
			loader_report.value = true;
			const id_tran = id;
			let obj_data = [];

			await axios.post(`${urlApi}/api/mongo/report`, { "id_busqueda": id_tran })
				.then(function (response) {
					console.log(response.data.Report[0]);
					obj_data.push(response.data.Report[0]);
					store.commit("setShowEditExpenseReport", obj_data);
				})
				.catch(function (error) {
					console.log(error);
				});

			loader_report.value = false;
			/* switch (id_tran) {
				case 1:
					obj_data.push({
						id: 772,
						empleado: "Jaime Chavez",
						identificador: "jaime12345",
						subsidiaria: "firstchash almacen 1",
						nota: "Prueba para la aplicacion sin licencia de NETSUITE",
						fecha: new Date(),
						documento: "transaccion.pdf",
						estado: "Pendiente por aprobar",
						notaAprobacion: "Prueba de nota de aprobacion",
						total: 57894.30
					});
					break;
				case 2:
					obj_data.push({
						id: 110,
						empleado: "Martin Pinilla",
						identificador: "jaime12345",
						subsidiaria: "Almacen Martin",
						nota: "Prueba para la aplicacion sin licencia de NETSUITE con datos de martin",
						fecha: new Date(),
						documento: "transaccion.pdf",
						estado: "Pendiente por aprobar",
						notaAprobacion: "Prueba de nota de aprobacion",
						total: 5778894.30
					});
					break;
			}
			store.commit("setShowEditExpenseReport", obj_data);
			console.log(obj); */
		};

		const handleClickNewExpenseReport = () => {
			store.commit("setShowNewExpenseReport");
		};

		const getListReports = async () => {
			loader.value = true;
			let objReports = undefined;
			let obj_data_employees = [];

			await axios.get(`${urlApi}/api/mongo/employees`)
				.then(function (response) {
					console.log(response.data.Employees);
					obj_data_employees.push(response.data.Employees);
					store.commit("setEmployeesList", obj_data_employees[0]);
					console.log("list employees", listEmployees.value);
				})
				.catch(function (error) {
					console.log(error);
				});

			await axios.get(`${urlApi}/api/mongo/report/list`, {})
				.then(function (response) {
					console.log(response.data.Reports);
					objReports = response.data.Reports;
					store.commit("setListReport", objReports);
				})
				.catch(function (error) {
					console.log(error);
				});
			loader.value = false;
		}

		const getListExpenseReports = async () => {
			loader.value = true;
			let objReports = undefined;
			let obj_data_employees = [];

			await axios.get(`${urlApi}/api/mongo/employees`)
				.then(function (response) {
					console.log(response.data.Employees);
					obj_data_employees.push(response.data.Employees);
					store.commit("setEmployeesList", obj_data_employees[0]);
					console.log("list employees", listEmployees.value);
				})
				.catch(function (error) {
					console.log(error);
				});

			await axios.post(`${urlApi}/api/mongo/reports/new`, {})
				.then(function (response) {
					console.log(response.data.Reports);
					objReports = response.data.Reports;
					store.commit("setListReport", objReports);
				})
				.catch(function (error) {
					console.log(error);
				});
			loader.value = false;
		}

		const filterEmployees = async (e) => {
			const entity = e.target.value;
			selectedFilterEmployee.value = entity;
			console.log(selectedFilterEmployee.value);
		}

		const filterStatus = async (e) => {
			const entity = e.target.value;
			selectedFilterEstatus.value = entity;
			console.log(selectedFilterEstatus.value);
		}

		const filterOrdenacion = async (e) => {
			const ord = e.target.value;
			let starDate = `${startDateFilter.value}T05:00:00`;
			let finishDate = `${finishDateFilter.value}T05:00:00`;
			const entity = selectedFilterEmployee.value;
			const estatus = selectedFilterEstatus.value;
			selectedFilterOrdenacion.value = ord;
			console.log(selectedFilterOrdenacion.value);

			if (startDateFilter.value == "") {
				starDate = "0001-01-01T05:00:00";
			}
			if (finishDateFilter.value == "") {
				finishDate = "9999-01-01T05:00:00";
			}

			let objReports = undefined;
			await axios.get(`${urlApi}/api/mongo/report/filter/employee/${ord}/${entity}/${starDate}/${finishDate}/${estatus}`)
				.then(function (response) {
					console.log(response.data.Reports);
					objReports = response.data.Reports;
					store.commit("setListReport", objReports);
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		const filterList = async () => {
			const ord = selectedFilterOrdenacion.value;
			let starDate = `${startDateFilter.value}T05:00:00`;
			let finishDate = `${finishDateFilter.value}T05:00:00`;
			const entity = selectedFilterEmployee.value;
			const estatus = selectedFilterEstatus.value;

			if (startDateFilter.value == "") {
				starDate = "0001-01-01T05:00:00";
			}
			if (finishDateFilter.value == "") {
				finishDate = "9999-01-01T05:00:00";
			}

			let objReports = undefined;
			await axios.get(`${urlApi}/api/mongo/report/filter/employee/${ord}/${entity}/${starDate}/${finishDate}/${estatus}`)
				.then(function (response) {
					console.log(response.data.Reports);
					objReports = response.data.Reports;
					store.commit("setListReport", objReports);
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		return {
			handleClickList,
			handleClickNewExpenseReport,
			filterEmployees,
			filterOrdenacion,
			filterList,
			getListExpenseReports,
			filterStatus,
			userObj,
			listReports,
			loader,
			loader_report,
			listEmployees,
			selectedFilterEmployee,
			selectedFilterOrdenacion,
			selectedFilterEstatus,
			startDateFilter,
			finishDateFilter,
		}
	}
}
</script>

<style lang="scss" scoped>
h2 {
	color: #071689
}

.form-filtros {
	label {
		color: #071689;
		font-weight: bold;
	}
}

.header-table {
	background-color: #dee6f0;
	margin-left: 1px;
	margin-right: 1px;

	.header-table-float {
		float: right;
		padding-right: 10px;

		.form-control-header {
			margin-top: 7px;
		}

		.form-control-header-text {
			font-size: 13px;
			text-align: right;
			font-weight: bold;
		}
	}

	.icon-header-table {
		font-size: 30px;
		margin-left: 10px;
		margin-right: 2px;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.icon-csv {
		color: #020202;

		:hover {
			cursor: pointer;
			color: rgb(114, 114, 114);
		}
	}

	.icon-xml {
		color: #4a8c6c;

		:hover {
			cursor: pointer;
			color: #69c699;
		}
	}

	.icon-pdf {
		color: #c95f61;

		:hover {
			cursor: pointer;
			color: #f69394;
		}
	}

	.icon-print {
		color: #071689;

		:hover {
			cursor: pointer;
			color: #0f28e1;
		}
	}
}

.v-line {
	border-left: 2px solid rgb(175, 175, 175);
	border-right: 2px solid rgb(175, 175, 175);
	padding-right: 12px;
	padding-left: 12px;
}

.btn-ver {
	&:hover {
		cursor: pointer;
		color: #0f28e1;
	}
}

.loader {
	position: relative;
	font-size: 38px;
	letter-spacing: 2px;
}

.loader:before {
	content: "Sincronizando Reporte de gastos...";
	color: #071689;
}

.loader:after {
	content: "";
	width: 30px;
	height: 30px;
	background-color: #075e89;
	border-radius: 50%;
	position: absolute;
	inset: 0;
	margin: auto;
	top: -70px;
	animation: motion 3s ease-in-out infinite;
}

.loader_report {
	position: relative;
	font-size: 38px;
	letter-spacing: 2px;
}

.loader_report:before {
	content: "Cargando reporte de gastos...";
	color: #071689;
}

.loader_report:after {
	content: "";
	width: 30px;
	height: 30px;
	background-color: #075e89;
	border-radius: 50%;
	position: absolute;
	inset: 0;
	margin: auto;
	top: -70px;
	animation: motion 3s ease-in-out infinite;
}

@keyframes motion {

	0%,
	50%,
	100% {
		transform: translateX(0) scale(1);
	}

	25% {
		transform: translateX(-100px) scale(0.3);
	}

	75% {
		transform: translateX(100px) scale(0.3);
	}
}

.centerloader {
	background: rgb(255, 255, 255);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>