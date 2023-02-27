<template>
	<div class="container-fluid mt-3">
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<h2 style="letter-spacing: 1px;"><font-awesome-icon icon="fa-solid fa-money-bill-1-wave"
						class="icon-reporte" /> Reporte de gastos
				</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<h4><strong style="color:#091689; letter-spacing: 2px;">Nuevo reporte de gastos</strong></h4>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
				<button type="button" class="btn btn-primary btn-aprobar" @click="handleCreateReport"
					:class="{ disabled: loader_create }"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-1"
						v-if="!loader_create" /> <span class="spinner-border spinner-border-sm" role="status"
						aria-hidden="true" v-if="loader_create"></span> {{ button_Create }}</button>
				<button type="button" class="btn btn-light btn-cancelar" @click="handleClickCancel"
					:class="{ disabled: loader_create }"><strong>Cancelar</strong></button>
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
									<input type="text" class="form-control input-style"
										:value="userObj.internalid + ' ' + userObj.entityid" disabled />
								</div>
								<div class="inputControl mt-2">
									<label for="txtSubsidiaria" class="form-label">Subsidiaria</label>
									<input type="text" class="form-control input-style" v-model="formData.subsidiary"
										disabled>
								</div>
								<div class="inputControl mt-2">
									<label for="txtNota" class="form-label">Nota</label>
									<textarea class="form-control input-style" id="txtNota" rows="7"
										v-model="formData.nota"></textarea>
								</div>
							</div>
							<div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
								<div class="inputControl mt-2">
									<label for="txtFecha" class="form-label">Fecha</label>
									<input type="date" class="form-control input-style" v-model="formData.trandate" />
								</div>
								<div class="inputControl mt-2">
									<label for="txtnAME" class="form-label">Documento Adicional</label>
									<input type="file" class="form-control input-style" @change="onDocumentoAdicional" />
								</div>
								<div class="inputControl mt-2">
									<label for="txtnAME" class="form-label">Estado</label>
									<input type="text" class="form-control input-style" />
								</div>
								<div class="inputControl mt-2 center-nota">
									<label for="txtnAME" class="form-label">Nota de Aprobación</label>
									<textarea class="form-control input-style" rows="3"
										v-model="formData.nota_cancelacion"></textarea>
								</div>
							</div>
							<div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
								<div class="card mt-2">
									<div class="card-header color-total">
										Resumen
									</div>
									<div class="card-body color-bg-total">
										<h5 class="card-title">Total</h5>
										<p class="txtTotal">${{ totalReport }} MXN</p>
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
		<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
			<section>
				<button class="btn btn-primary btn-modal" @click="launchModal">
					Agregar Gasto
				</button>
				<div id="myModal" class="modal fade" tabindex="-1">
					<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
						<div class="modal-content">
							<div class="modal-header">
								<h2 class="modal-title"><font-awesome-icon icon="fa-solid fa-bars" class="icon-reporte" />
									Agregar linea de gasto</h2>
								<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"
									@click="closeModal"></button>
							</div>
							<div class="modal-body">
								<div class="container">
									<div class="row">
										<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Fecha del gasto</label>
												<input type="date" class="form-control"
													v-model="formModalLineData.expensedate" />
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Departamento</label>
												<input type="number" class="form-control"
													v-model="formModalLineData.departamento" />
											</div>
										</div>
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Categoria</label>
												<input type="number" class="form-control"
													v-model="formModalLineData.category" />
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Cuenta</label>
												<input type="number" class="form-control"
													v-model="formModalLineData.expenseaccount" />
											</div>
										</div>
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Moneda</label>
												<input type="number" class="form-control"
													v-model="formModalLineData.currency" />
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Tipo de cambio</label>
												<input type="number" class="form-control"
													v-model="formModalLineData.exchangerate" />
											</div>
										</div>
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Importe</label>
												<input type="number" class="form-control" v-model="formModalLineData.amount"
													@blur="handleblur" />
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Impuesto</label>
												<input type="number" class="form-control"
													v-model="formModalLineData.impuesto" @blur="handleblur" />
											</div>
										</div>
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Total</label>
												<input type="number" class="form-control" disabled
													v-model="formModalLineData.total" />
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Nota</label>
												<textarea class="form-control" rows="3"
													v-model="formModalLineData.memo"></textarea>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">XML</label>
												<input type="file" class="form-control" @change="onXML" />
											</div>
										</div>
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">PDF</label>
												<input type="file" class="form-control" @change="onPDF" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal"
									@click="closeModal">Cancelar</button>
								<button type="button" class="btn btn-primary modal-save-btn"
									@click="addExpenseLine">Agregar</button>
							</div>
						</div>
					</div>
				</div>
			</section>
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
					<tr v-for="(line, index) in lines" :key="index">
						<th scope="row">{{ index + 1 }}</th>
						<td>{{ line.departamento }}</td>
						<td>{{ line.category }}</td>
						<td>{{ line.currency }}</td>
						<td>{{ line.exchangerate }}</td>
						<td>{{ line.amount }}</td>
						<td>{{ line.impuesto }}</td>
						<td>{{ line.total }}</td>
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
import { Modal } from 'bootstrap';
import { createToaster } from "@meforma/vue-toaster";
import axios from 'axios';

export default {
	name: "NewExpenseReport",
	components: {},
	setup() {

		//VARIABLES
		let modal = null;
		const store = useStore();
		let formModalLineData = ref({});
		let formData = ref({});
		const lines = ref([]);
		let totalReport = ref(0);
		const userObj = ref(computed(() => store.state.user));
		const loader_create = ref(false);
		let button_Create = ref(`Guardar`);
		const toaster = createToaster({ position: "top", duration: 6000, type: "success" });
		const toasterFailed = createToaster({ position: "top", duration: 6000, type: "error" });
		//END VARIABLES

		//FUNCIONES
		onMounted(() => {
			modal = new Modal(document.getElementById('myModal'));
			formData.value.entity = userObj.value.internalid;
			formData.value.subsidiary = userObj.value.subsidiary;
			formData.value.anticipo_recibidpo = false;
			formData.value.supervisorapproval = false;
			formData.value.advanceaccount = "118";
			formData.value.account = "111";
		});

		const launchModal = () => {
			modal.show();
		};
		const closeModal = () => {
			modal.hide();
		};

		const handleClickCancel = () => {
			store.commit("setShowList");
		};

		const addExpenseLine = () => {
			const expensedate = new Date(formModalLineData.value.expensedate);
			formModalLineData.value.expensedate = expensedate.toLocaleDateString();

			let objLine = formModalLineData.value;
			lines.value.push(objLine);

			const amount = Number(formModalLineData.value.total);
			console.log(amount);
			totalReport.value += amount;

			formModalLineData.value = {};
			modal.hide();
		}

		const handleCreateReport = async () => {
			loader_create.value = true;
			button_Create.value = "Enviando a NS..."

			let objForm = formData.value;
			objForm.expense_list = lines.value;
			formData.value = objForm;
			const trandate = new Date(formData.value.trandate);
			formData.value.trandate = trandate.toLocaleDateString();

			await axios.post('http://127.0.0.1:3000/api/mongo/report/create', formData.value)
				.then(function (response) {
					console.log("isSuccessful", response.data.isSuccessful);
					if (response.data.isSuccessful) {
						toaster.show(`Reporte creado correctamente`);
						console.log(response.data);
					} else {
						toasterFailed.show(`Reporte creado correctamente`);
						console.log(response.data);
					}
				})
				.catch(function (error) {
					console.log(error);
				});

			loader_create.value = false;
			button_Create.value = "Aprobar"

			console.log(formData.value);
		}

		const onDocumentoAdicional = (e) => {
			const files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;

			let file = files[0];
			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function () {
				console.log(reader.result);
				// Encode the String
				const encodedDocAdiconal = btoa(reader.result);
				formData.value.documento_adicional = encodedDocAdiconal
			};

			reader.onerror = function () {
				console.log(reader.error);
			};
		}

		const onXML = (e) => {
			const files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;

			let file = files[0];
			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function () {
				console.log(reader.result);
				// Encode the String
				const encodedXML = btoa(reader.result);
				formModalLineData.value.xml = encodedXML
			};

			reader.onerror = function () {
				console.log(reader.error);
			};
		}

		const onPDF = (e) => {
			const files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;

			let file = files[0];
			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function () {
				console.log(reader.result);
				// Encode the String
				const encodedPDF = btoa(reader.result);
				formModalLineData.value.pdf = encodedPDF
			};

			reader.onerror = function () {
				console.log(reader.error);
			};
		}

		const handleblur = () => {
			const importe = formModalLineData.value.amount;
			const impuesto = formModalLineData.value.impuesto;
			formModalLineData.value.total = importe + impuesto;
		}
		//END FUNCIONES

		return {
			handleClickCancel,
			launchModal,
			closeModal,
			lines,
			formModalLineData,
			addExpenseLine,
			formData,
			handleCreateReport,
			onDocumentoAdicional,
			onXML,
			onPDF,
			totalReport,
			handleblur,
			userObj,
			loader_create,
			button_Create
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