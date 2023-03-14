<template>
	<div class="container-fluid mt-3">
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<h2 style="letter-spacing: 1px;"><font-awesome-icon icon="fa-solid fa-rotate" class="icon-reporte" />
					Sincronización con Netsuite
				</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<button type="button" class="btn btn-primary btn-aprobar"
					@click="handleClickCancel"><strong>Salir</strong></button>
			</div>
		</div>
		<div class="row mt-1">
			<div class="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-3">
				<div class="card">
					<div class="card-header" style="background-color: #091689; color: white;">
						Reporte de gastos
					</div>
					<div class="card-body">
						<!-- <p class="card-text">Sincronizar reportes de gastos con los almacenados en Netsuite.</p> -->
						<button class="btn btn-primary col-12" :class="{ disabled: loaderReporte }"
							@click="syncReportesGastos"><span class="spinner-border spinner-border-sm" role="status"
								aria-hidden="true" v-if="loaderReporte"></span> {{ button_reporte }}</button>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-3">
				<div class="card">
					<div class="card-header" style="background-color: #091689; color: white;">
						Empleados
					</div>
					<div class="card-body">
						<!-- <p class="card-text">Sincronizar empleados con los almacenados en Netsuite.</p> -->
						<button class="btn btn-primary col-12" :class="{ disabled: loaderEmpleados }"
							@click="syncEmpleados"><span class="spinner-border spinner-border-sm" role="status"
								aria-hidden="true" v-if="loaderEmpleados"></span> {{ button_Empleados }}</button>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-3">
				<div class="card">
					<div class="card-header" style="background-color: #091689; color: white;">
						Subsidiarias
					</div>
					<div class="card-body">
						<!-- <p class="card-text">Sincronizar subsidiarias con los almacenados en Netsuite.</p> -->
						<button class="btn btn-primary col-12" :class="{ disabled: loaderSubsidiarias }"
							@click="syncSubsidiarias"><span class="spinner-border spinner-border-sm" role="status"
								aria-hidden="true" v-if="loaderSubsidiarias"></span> {{ button_subsidiarias }}</button>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-3">
				<div class="card">
					<div class="card-header" style="background-color: #091689; color: white;">
						Monedas
					</div>
					<div class="card-body">
						<!-- <p class="card-text">Sincronizar monedas con los almacenados en Netsuite.</p> -->
						<button class="btn btn-primary col-12" :class="{ disabled: loaderMonedas }"
							@click="syncMonedas"><span class="spinner-border spinner-border-sm" role="status"
								aria-hidden="true" v-if="loaderMonedas"></span> {{ button_Monedas }}</button>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-3">
				<div class="card">
					<div class="card-header" style="background-color: #091689; color: white;">
						Ubicaciones
					</div>
					<div class="card-body">
						<!-- <p class="card-text">Sincronizar ubicaciones con los almacenados en Netsuite.</p> -->
						<button class="btn btn-primary col-12" :class="{ disabled: loaderUbicaciones }"
							@click="syncUbicaciones"><span class="spinner-border spinner-border-sm" role="status"
								aria-hidden="true" v-if="loaderUbicaciones"></span> {{ button_Ubicaciones }}</button>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-3">
				<div class="card">
					<div class="card-header" style="background-color: #091689; color: white;">
						Departamentos
					</div>
					<div class="card-body">
						<!-- <p class="card-text">Sincronizar departamentos con los almacenados en Netsuite.</p> -->
						<button class="btn btn-primary col-12" :class="{ disabled: loaderDepartamentos }"
							@click="syncDepartamentos"><span class="spinner-border spinner-border-sm" role="status"
								aria-hidden="true" v-if="loaderDepartamentos"></span> {{ button_Departamentos }}</button>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-4 col-lg-2 col-xl-2 col-xxl-2 mt-3">
				<div class="card">
					<div class="card-header" style="background-color: #091689; color: white;">
						Categorias
					</div>
					<div class="card-body">
						<!-- <p class="card-text">Sincronizar categorias con los almacenados en Netsuite.</p> -->
						<button class="btn btn-primary col-12" :class="{ disabled: loaderCategorias }"
							@click="syncCategorias"><span class="spinner-border spinner-border-sm" role="status"
								aria-hidden="true" v-if="loaderCategorias"></span> {{ button_Categorias }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

export default {
	name: "NewExpenseReport",
	components: {},
	setup() {
		const store = useStore();
		const urlApi = process.env.VUE_APP_URL_API_LOCAL;
		const toaster = createToaster({ position: "top", duration: 9000, type: "success" });
		const toasterFailed = createToaster({ position: "top", duration: 9000, type: "error" });
		const txt_cargando = " Cargando...";
		let loaderReporte = ref(false);
		let button_reporte = ref("Sincronizar");
		let loaderEmpleados = ref(false);
		let button_Empleados = ref("Sincronizar");
		let loaderSubsidiarias = ref(false);
		let button_subsidiarias = ref("Sincronizar");
		let loaderMonedas = ref(false);
		let button_Monedas = ref("Sincronizar");
		let loaderUbicaciones = ref(false);
		let button_Ubicaciones = ref("Sincronizar");
		let loaderDepartamentos = ref(false);
		let button_Departamentos = ref("Sincronizar");
		let loaderCategorias = ref(false);
		let button_Categorias = ref("Sincronizar");

		const handleClickCancel = () => {
			store.commit("setShowList");
		};

		const syncReportesGastos = async () => {
			loaderReporte.value = true;
			button_reporte.value = txt_cargando;
			let objReports = undefined;
			await axios.post(`${urlApi}/api/mongo/reports/new`, {})
				.then(function (response) {
					objReports = response.data.Reports;
					store.commit("setListReport", objReports);
					toaster.show(`Sincronización de reporte de gastos correcta`);
				})
				.catch(function (error) {
					toasterFailed.show(`Ocurrio un error al sincronizar los reportes de gastos`);
					console.log(error);
				});
			loaderReporte.value = false;
			button_reporte.value = "Sincronizar";
		}

		const syncEmpleados = async () => {
			loaderEmpleados.value = true;
			button_Empleados.value = txt_cargando;
			let obj_data_employees = [];
			await axios.post(`${urlApi}/api/mongo/employees/new`)
				.then(function (response) {
					obj_data_employees.push(response.data.Employees);
					store.commit("setEmployeesList", obj_data_employees[0]);
					toaster.show(`<font-awesome-icon icon="fa-solid fa-check" /> Sincronización de empleado correcta`);
				})
				.catch(function (error) {
					toasterFailed.show(`Ocurrio un error al sincronizar los empleados`);
					console.log(error);
				});
			loaderEmpleados.value = false;
			button_Empleados.value = "Sincronizar";
		}

		const syncSubsidiarias = async () => {
			loaderSubsidiarias.value = true;
			button_subsidiarias.value = txt_cargando;
			await axios.post(`${urlApi}/api/mongo/sub/new`)
				.then(function (response) {
					toaster.show(`Sincronización de subsidiarias correcta`);
				})
				.catch(function (error) {
					toasterFailed.show(`Ocurrio un error al sincronizar las subsidiarias`);
					console.log(error);
				});
			loaderSubsidiarias.value = false;
			button_subsidiarias.value = "Sincronizar";
		}

		const syncMonedas = async () => {
			loaderMonedas.value = true;
			button_Monedas.value = txt_cargando;
			await axios.post(`${urlApi}/api/mongo/currencys/new`)
				.then(function (response) {
					toaster.show(`Sincronización de monedas correcta`);
				})
				.catch(function (error) {
					toasterFailed.show(`Ocurrio un error al sincronizar las monedas`);
					console.log(error);
				});
			loaderMonedas.value = false;
			button_Monedas.value = "Sincronizar";
		}

		const syncUbicaciones = async () => {
			loaderUbicaciones.value = true;
			button_Ubicaciones.value = txt_cargando;
			await axios.get(`${urlApi}/api/mongo/locations/new`)
				.then(function (response) {
					toaster.show(`Sincronización de ubicaciones correcta`);
				})
				.catch(function (error) {
					toasterFailed.show(`Ocurrio un error al sincronizar las ubicaciones`);
					console.log(error);
				});
			loaderUbicaciones.value = false;
			button_Ubicaciones.value = "Sincronizar";
		}

		const syncDepartamentos = async () => {
			loaderDepartamentos.value = true;
			button_Departamentos.value = txt_cargando;
			await axios.get(`${urlApi}/api/mongo/deparments/new`)
				.then(function (response) {
					toaster.show(`Sincronización de departamentos correcta`);
				})
				.catch(function (error) {
					toasterFailed.show(`Ocurrio un error al sincronizar los departamentos`);
					console.log(error);
				});
			loaderDepartamentos.value = false;
			button_Departamentos.value = "Sincronizar";
		}

		const syncCategorias = async () => {
			loaderCategorias.value = true;
			button_Categorias.value = txt_cargando;
			await axios.get(`${urlApi}/api/mongo/categories/new`)
				.then(function (response) {
					toaster.show(`Sincronización de categorias correcta`);
				})
				.catch(function (error) {
					toasterFailed.show(`Ocurrio un error al sincronizar las categorias`);
					console.log(error);
				});
			loaderCategorias.value = false;
			button_Categorias.value = "Sincronizar";
		}

		return {
			handleClickCancel,
			syncReportesGastos,
			syncEmpleados,
			syncSubsidiarias,
			syncMonedas,
			syncUbicaciones,
			syncDepartamentos,
			syncCategorias,
			loaderReporte,
			button_reporte,
			loaderEmpleados,
			button_Empleados,
			loaderSubsidiarias,
			button_subsidiarias,
			loaderMonedas,
			button_Monedas,
			loaderUbicaciones,
			button_Ubicaciones,
			loaderDepartamentos,
			button_Departamentos,
			loaderCategorias,
			button_Categorias,
		}
	}
}
</script>

<style lang="scss" scoped>
.icon-reporte {
	color: #091689;
	margin-right: 10px;
}

.btn-aprobar {
	margin-right: 10px;
	background-color: #091689;
	width: 150px;
}

.btn-cancelar {
	margin-right: 10px;
	background-color: #ececec;
	width: 150px;
}

.input-style {
	background-color: #fffefe;
	width: 80%;
}

.color-header {
	background-color: #dce6ef;
}

.color-total {
	background-color: #5c7495;
	color: #ffffff;
}

.header-table {
	background-color: #091689;
	color: #ffffff;
	margin-left: 12px;
	margin-right: 12px;

	h5 {
		margin-left: 10px;
		letter-spacing: 2px;
	}
}

.tamaño-table {
	margin-left: 12px;
	margin-right: 22px;
	font-size: 12px;
}

.txtTotal {
	font-weight: bold;
	font-size: 18px;
}

.color-bg-total {
	background-color: #ececec;
}

.icon-pdf {
	color: #c95f61;
	font-size: 25px;

	:hover {
		cursor: pointer;
		color: #f69394;
	}
}

.icon-xml {
	color: #4a8c6c;
	font-size: 25px;

	:hover {
		cursor: pointer;
		color: #69c699;
	}
}

.btn-modal {
	margin-top: 5px;
	margin-left: 13px;
	margin-bottom: 15px;
	background-color: #091689;
	width: 150px;

	&:hover {
		background-color: #091689b6;
	}
}

.modal-title {
	color: #091689;
}

.modal-save-btn {
	color: #ffffff;
	background-color: #091689;

	&:hover {
		background-color: #091689b6;
	}
}
</style>