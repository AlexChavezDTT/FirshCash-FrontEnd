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
				<button type="button" class="btn btn-primary btn-aprobar" :class="{ disabled: loader_aprovee }"
					v-if="userObj.internalid === 454" @click="updateReport(obj_data.internalid)"><font-awesome-icon
						icon="fa-solid fa-check" class="me-1" v-if="!loader_aprovee" />
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
						v-if="loader_aprovee"></span>
					{{ button_aprovee }}</button>
				<button type="button" class="btn btn-light btn-cancelar"
					@click="handleClickCancel"><strong>Cancelar</strong></button>
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
									<input type="text" class="form-control input-style" v-model="obj_data.documento"
										disabled />
								</div>
								<div class="inputControl mt-2">
									<label for="txtnAME" class="form-label">Estado</label>
									<input type="text" class="form-control input-style" v-model="obj_data.status"
										disabled />
								</div>
								<div class="inputControl mt-2 center-nota">
									<label for="txtnAME" class="form-label">Nota de Aprobación</label>
									<textarea class="form-control input-style" rows="3"
										v-model="obj_data.custbody_fc_nota_aprobacion" disabled></textarea>
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
			<table class="table tamaño-table">
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
						<th scope="col">PDF</th>
						<th scope="col">XML</th>
					</tr>
				</thead>
				<tbody>
					<tr scope="row" v-for="(line, index) in obj_data.lines" :key="index">
						<td>{{ index + 1 }}</td>
						<td>XXXXX</td>
						<td>XXXXX</td>
						<td>{{ line.currency }}</td>
						<td>{{ line.exchangerate }}</td>
						<td>{{ line.amount }}</td>
						<td>XXXXX</td>
						<td>XXXXX</td>
						<td>{{ line.memo }}</td>
						<td><font-awesome-icon icon="fa-solid fa-file-pdf" class="icon-header-table icon-pdf"
								data-bs-toggle="tooltip" data-bs-placement="top" title="Exportar a PDF" /></td>
						<td><font-awesome-icon icon="fa-solid fa-file-excel" class="icon-header-table icon-xml"
								data-bs-toggle="tooltip" data-bs-placement="top" title="Exportar s Excel" /></td>
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
		const obj = ref(computed(() => store.state.infoList));
		const obj_data = obj.value[0];
		const userObj = ref(computed(() => store.state.user));
		const loader_aprovee = ref(false);
		let button_aprovee = ref(`Aprobar`);
		const toaster = createToaster({ position: "top", duration: 6000, type: "success" });
		const showMessage = ref(false);

		const handleClickCancel = () => {
			store.commit("setShowList");
		};

		const updateReport = async (id) => {
			loader_aprovee.value = true;
			button_aprovee.value = "Actualizando a NS..."
			let objReports = {
				"id": id,
				"memo": "Prueba alejandro dentro app",
				"custbody_fc_cancelacion": true
			}
			await axios.put('http://127.0.0.1:3000/api/mongo/report', objReports)
				.then(function (response) {
					console.log("isSuccessful", response.data);
					toaster.show(`Reporte actualizado correctamente`);
					showMessage.value = true;
				})
				.catch(function (error) {
					console.log(error);
				});
			loader_aprovee.value = false;
			button_aprovee.value = "Aprobar"
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
			loader_aprovee,
			button_aprovee,
			showMessage
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

.btn-cancelar {
	margin-right: 10px;
	background-color: #ececec;
	width: 200px;
}

.input-style {
	background-color: #ececec;
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
</style>