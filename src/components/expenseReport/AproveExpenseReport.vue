<template>
	<div class="container-fluid mt-3">
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<h2 style="letter-spacing: 1px;"><font-awesome-icon icon="fa-solid fa-money-bill-1-wave"
						class="icon-reporte" /> Reporte de gastos
				</h2>
			</div>
		</div>
		<!-- <div class="row mt-3" style="width: 20%; margin-left: 1px;" v-if="showMessage">
			<div class="alert alert-success alert-dismissible fade show" role="alert">
				<strong><font-awesome-icon icon="fa-solid fa-check" class="me-1" />Reporte actualizado
					correctamente</strong>
				<button type="button" class="btn-close" @click="closeMessage"></button>
			</div>
		</div> -->
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<h4>{{ obj_data.internalid }} <strong style="color:#091689; letter-spacing: 2px;">{{
					obj_data.tranId
				}}</strong></h4>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<div class="mb-3" v-if="!obj_data.anticipo">
					<button type="button" class="btn btn-primary btn-aprobar"
						:class="{ disabled: loader_aprovee || obj_data.status == 'Pending Accounting Approval' || obj_data.cancelacion }"
						v-show="userObj.internalid != obj_data.entity_id && !obj_data.cancelacion"
						@click="updateReport(obj_data.internalid)"><font-awesome-icon icon="fa-solid fa-check" class="me-1"
							v-if="!loader_aprovee" />
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
							v-if="loader_aprovee"></span>
						{{ obj_data.status == 'Pending Accounting Approval' ? "Aprobado" : button_aprovee }}</button>

					<button type="button" class="btn btn-danger btn-rechazar"
						:class="{ disabled: loader_rechazar || obj_data.cancelacion }"
						v-if="userObj.internalid != obj_data.entity_id"
						v-show="obj_data.status != 'Pending Accounting Approval'"
						@click="handleRejectExpense(obj_data.internalid)"><font-awesome-icon icon="fa-solid fa-xmark"
							class="me-1" v-if="!loader_rechazar" />
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
							v-if="loader_rechazar"></span>
						{{ obj_data.cancelacion ? "Rechazado" : button_rechazar }}</button>
				</div>

				<button type="button" class="btn btn-light btn-cancelar"
					@click="handleClickCancel"><strong>Salir</strong></button>
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<div class="card">
					<div class="card-header color-header">
						Información Primaria
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
								<div class="inputControl mt-2">
									<label for="txtEmpleado" class="form-label">Empleado</label>
									<input type="text" class="form-control input-style" v-model="obj_data.entity_name"
										disabled />
								</div>
								<div class="inputControl mt-2">
									<label for="txtSubsidiaria" class="form-label">Subsidiaria</label>
									<input type="text" class="form-control input-style" v-model="obj_data.subsidiary_name"
										disabled>
								</div>
								<div class="inputControl mt-2">
									<label for="txtNota" class="form-label">Nota</label>
									<textarea class="form-control input-style" id="txtNota" rows="7" v-model="obj_data.memo"
										disabled></textarea>
								</div>
							</div>
							<div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
								<div class="inputControl mt-2">
									<label for="txtFecha" class="form-label">Fecha</label>
									<input type="text" class="form-control input-style" v-model="obj_data.trandate"
										disabled />
								</div>
								<div class="inputControl mt-2">
									<label for="txtnAME" class="form-label">Documento Adicional</label>
									<a :href="obj_data.urlDocumentoAdicional" class="form-control input-style-link"
										target="__blank">{{
											obj_data.nameDocumentoAdicional }}</a>
									<!-- <input type="text" class="form-control input-style" v-model="obj_data.documento"
										disabled /> -->
								</div>
								<div class="inputControl mt-2">
									<label for="txtnAME" class="form-label">Estado</label>
									<input type="text" class="form-control input-style" v-model="obj_data.status"
										disabled />
								</div>
								<div class="inputControl mt-2 center-nota">
									<label for="txtnAME" class="form-label">Nota de Aprobación</label>
									<textarea class="form-control input-style-aprobacion" rows="3"
										v-model="obj_data.custbody_fc_nota_aprobacion"></textarea>
								</div>
								<div class="form-check mt-2">
									<input class="form-check-input" type="checkbox" v-model="obj_data.anticipo" disabled>
									<label class="form-check-label" for="flexCheckDefault">
										Anticipo aplicado
									</label>
								</div>
							</div>
							<div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
								<div class="card mt-2">
									<div class="card-header color-total">
										Resumen
									</div>
									<div class="card-body color-bg-total">
										<h5 class="card-title">Total</h5>
										<p class="txtTotal">${{ (obj_data.amount).toLocaleString("en-US") }} MXN</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row mt-3">
		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
			<div class="header-table">
				<h5>Gastos</h5>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 table-responsive">
			<table class="table table-striped table-bordered tamaño-table text-center">
				<thead style="background: #e5e5e5">
					<tr>
						<th scope="col"></th>
						<th scope="col">DEPARTAMENTO</th>
						<th scope="col">CATEGORIA</th>
						<th scope="col">MONEDA</th>
						<th scope="col">TIPO DE CAMBIO</th>
						<th scope="col">IMPORTE</th>
						<th scope="col">IMPUESTO</th>
						<th scope="col">TOTAL</th>
						<th scope="col">NOTA</th>
						<th scope="col"><font-awesome-icon icon="fa-solid fa-file-pdf" class="icon-header-table icon-pdf"
								data-bs-toggle="tooltip" data-bs-placement="top" title="Exportar a PDF" /> PDF</th>
						<th scope="col"><font-awesome-icon icon="fa-solid fa-file-excel" class="icon-header-table icon-xml"
								data-bs-toggle="tooltip" data-bs-placement="top" title="Exportar s Excel" /> XML</th>
					</tr>
				</thead>
				<tbody>
					<tr scope="row" v-for="(line, index) in obj_data.lines" :key="index" class="text-line">
						<td>{{ index + 1 }}</td>
						<td>{{ line.department }}</td>
						<td>{{ line.category }}</td>
						<td>{{ line.currency }}</td>
						<td><font-awesome-icon icon="fa-solid fa-coins" class="icon-header-table icon-coin"
								data-bs-toggle="tooltip" data-bs-placement="top" /> {{ line.exchangerate }}</td>
						<td><font-awesome-icon icon="fa-solid fa-dollar-sign" class="icon-header-table icon-dollar"
								data-bs-toggle="tooltip" data-bs-placement="top" /> {{ line.amount }}</td>
						<td><font-awesome-icon icon="fa-solid fa-dollar-sign" class="icon-header-table icon-dollar"
								data-bs-toggle="tooltip" data-bs-placement="top" /> {{ line.taxamount }}</td>
						<td><font-awesome-icon icon="fa-solid fa-dollar-sign" class="icon-header-table icon-dollar"
								data-bs-toggle="tooltip" data-bs-placement="top" /> {{ line.grossamt }}</td>
						<td>{{ line.memo }}</td>
						<td><a :href="line.pdfUrl" target="__blank" class="input-style-link-line">{{ line.pdfName }}</a>
						</td>
						<td><a :href="line.xmlUrl" target="__blank" class="input-style-link-line">{{ line.xmlname }}</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { onMounted, computed } from "@vue/runtime-core";
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

export default {
	name: "AproveExpenseReport",
	components: {},
	setup() {
		const store = useStore();
		const urlApi = process.env.VUE_APP_URL_API_LOCAL;
		const obj = ref(computed(() => store.state.infoList));
		const obj_data = ref(obj.value[0]);
		const userObj = ref(computed(() => store.state.user));
		const loader_aprovee = ref(false);
		const loader_rechazar = ref(false);
		let button_aprovee = ref(`Aprobar`);
		let button_rechazar = ref(`Rechazar`);
		const toaster = createToaster({ position: "top", duration: 6000, type: "success" });
		const showMessage = ref(false);
		const importe = ref(0);

		onMounted(() => {
		});

		const handleClickCancel = () => {
			store.commit("setShowList");
		};

		const handleRejectExpense = async (id) => {
			loader_rechazar.value = true;
			button_rechazar.value = "Rechazando en NS...";
			let objReports = {
				"id": id,
				"memo": obj_data.value.custbody_fc_nota_aprobacion,
				"custbody_fc_cancelacion": true,
				"supervisorapproval": false
			}
			await axios.put(`${urlApi}/api/mongo/report`, objReports)
				.then(function (response) {
					const data = response.data;
					obj_data.value.status = "Rechazado";
					obj_data.value.cancelacion = true;
					console.log("isSuccessful", response.data);
					toaster.show(`Reporte rechazado correctamente`);
					showMessage.value = true;
					button_rechazar.value = "Rechazar"
					loader_rechazar.value = false;
				})
				.catch(function (error) {
					console.log(error);
					loader_rechazar.value = false;
				});
		}

		const updateReport = async (id) => {
			loader_aprovee.value = true;
			button_aprovee.value = "Actualizando a NS..."
			let objReports = {
				"id": id,
				"memo": obj_data.value.custbody_fc_nota_aprobacion,
				"custbody_fc_cancelacion": false,
				"supervisorapproval": true
			}
			await axios.put(`${urlApi}/api/mongo/report`, objReports)
				.then(function (response) {
					axios.post(`${urlApi}/api/mongo/reports/new`, {})
						.then(function (response) {
							objReports = response.data.Reports;
							store.commit("setListReport", objReports);
							toaster.show(`Sincronización de reporte de gastos correcta`);
						})
						.catch(function (error) {
							toasterFailed.show(`Ocurrio un error al sincronizar los reportes de gastos`);
							console.log(error);
						});
					const data = response.data;
					obj_data.value.status = "Pending Accounting Approval";
					console.log("isSuccessful", response.data);
					toaster.show(`Reporte actualizado correctamente`);
					showMessage.value = true;
					button_aprovee.value = "Aprobado"
					loader_aprovee.value = false;
				})
				.catch(function (error) {
					console.log(error);
					loader_aprovee.value = false;
				});
		}

		const closeMessage = () => {
			showMessage.value = false;
		}

		return {
			obj_data,
			handleClickCancel,
			userObj,
			updateReport,
			closeMessage,
			handleRejectExpense,
			loader_aprovee,
			button_aprovee,
			loader_rechazar,
			button_rechazar,
			showMessage,
			importe
		}
	}
}
</script>

<style lang="scss" scoped>
.icon-reporte {
	color: #091689;
}

.btn-aprobar {
	margin-right: 10px;
	background-color: #091689;
	width: 200px;
}

.btn-rechazar {
	margin-right: 10px;
	background-color: #890909;
	width: 200px;
}

.btn-cancelar {
	margin-right: 10px;
	background-color: #ececec;
	width: 200px;
}

.input-style {
	background-color: #ececec;
	width: 80%;
}

.input-style-link {
	background-color: #ffffff;
	color: #0916899c;
	width: 80%;

	&:hover {
		color: #091689;
	}
}

.input-style-link-line {
	color: #0916899c;

	&:hover {
		color: #091689;
	}
}

.input-style-aprobacion {
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
	font-size: 15px;
}

.icon-xml {
	color: #4a8c6c;
	font-size: 15px;
}

.icon-dollar {
	color: #317654;
	font-size: 17px;
}

.icon-coin {
	color: #daa520;
	font-size: 17px;
}

.text-line {
	font-size: 16px;
}
</style>