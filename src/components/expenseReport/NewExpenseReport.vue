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
					:class="{ disabled: loader_create }" v-if="!url_reporte_ns"><font-awesome-icon
						icon="fa-solid fa-pen-to-square" class="me-1" v-if="!loader_create" /> <span
						class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
						v-if="loader_create"></span> {{ button_Create }}</button>
				<!-- <button type="button" class="btn btn-primary btn-aprobar" @click="handleCreateReportTest"
					:class="{ disabled: loader_create }"><font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-1"
						v-if="!loader_create" /> <span class="spinner-border spinner-border-sm" role="status"
						aria-hidden="true" v-if="loader_create"></span> Test</button> -->
				<button type="button" class="btn btn-light btn-cancelar" @click="handleClickCancel"
					:class="{ disabled: loader_create }"><strong>Cancelar</strong></button>
				<a :href="url_reporte_ns" v-if="url_reporte_ns">Ir al reporte creado en NS</a>
			</div>
			<div class="col-6">

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
							<div class="col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3">
								<h4 class="mt-3">Cabecera del gasto</h4>
								<div class="inputControl mt-2">
									<label for="txtEmpleado" class="form-label">Empleado</label>
									<input type="text" class="form-control input-style"
										:value="userObj.internalid + ' ' + userObj.entityid" disabled />
								</div>
								<div class="inputControl mt-2">
									<label for="txtSubsidiaria" class="form-label">Subsidiaria</label>
									<input type="text" class="form-control input-style" v-model="formData.subsidiaryName"
										disabled>
								</div>
								<div class="inputControl mt-2">
									<label for="txtNota" class="form-label">Nota</label>
									<textarea class="form-control input-style" id="txtNota" rows="7"
										v-model="formData.nota"></textarea>
								</div>
							</div>
							<div class="col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3">
								<h4 style="color: #09168900;" class="mt-3">-</h4>
								<div class="inputControl mt-2">
									<label for="txtFecha" class="form-label">Fecha</label>
									<input type="date" class="form-control input-style" v-model="formData.trandate" />
								</div>
								<div class="inputControl mt-2">
									<label for="txtnAME" class="form-label">Documento Adicional</label>
									<input type="file" class="form-control input-style" @change="onDocumentoAdicional" />
								</div>
								<!-- <div class="inputControl mt-2">
									<label for="txtnAME" class="form-label">Estado</label>
									<input type="text" class="form-control input-style" />
								</div> -->
								<div class="form-check mt-2">
									<input class="form-check-input" type="checkbox" v-model="formData.anticipo">
									<label class="form-check-label" for="flexCheckDefault">
										Anticipo aplicado
									</label>
								</div>
								<!-- <div class="inputControl mt-2 center-nota">
									<label for="txtnAME" class="form-label">Nota de Aprobación</label>
									<textarea class="form-control input-style" rows="6"
										v-model="formData.nota_cancelacion"></textarea>
								</div> -->
							</div>
							<div class="col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3"
								style="background-color: #dce6ef; border-radius: 2%;">
								<h4 class="mt-3">Configuración de Impuestos</h4>
								<div class="inputControl mt-2">
									<label for="txtEmpleado" class="form-label">Nexus</label>
									<select class="form-select" v-model="formData.nexus" @change="selectNexus">
										<option selected value="0">Seleccione...</option>
										<option :value="nexus.internalid" v-for="nexus in objNexus" :key="nexus.internalid">
											{{ nexus.description }}</option>
									</select>
								</div>
								<div class="inputControl mt-2">
									<label for="txtSubsidiaria" class="form-label">Número de registro fiscal</label>
									<input type="text" class="form-control input-style" v-model="formData.taxRegName"
										disabled>
								</div>
							</div>
							<div class="col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3">
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
					<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
						<div class="modal-content">
							<div class="modal-header">
								<h2 class="modal-title"><font-awesome-icon icon="fa-solid fa-bars" class="icon-reporte" />
									Agregar linea de gasto</h2>
								<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"
									@click="closeModal"></button>
							</div>
							<div class="modal-body">
								<div class="container">
									<h4>Gasto</h4>
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
												<select class="form-select" v-model="formModalLineData.departamento"
													@change="selectDeparment">
													<option selected value="0">Seleccione...</option>
													<option :value="deparment.internalid" v-for="deparment in objDeparments"
														:key="deparment.internalid">{{ deparment.name }}</option>
												</select>
											</div>
										</div>
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Categoria</label>
												<select class="form-select" v-model="formModalLineData.category"
													@change="selectCategory">
													<option selected value="0">Seleccione...</option>
													<option :value="categorie.internalid" v-for="categorie in objCategories"
														:key="categorie.internalid">{{ categorie.name }}</option>
												</select>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Cuenta</label>
												<input type="text" class="form-control" disabled
													v-model="formModalLineData.expenseAccountName" />
												<!-- <select class="form-select" v-model="formModalLineData.expenseAccountName">
													<option selected value="0">Seleccione...</option>
													<option selected value="58">Cuenta de prueba</option>
												</select> -->
											</div>
										</div>
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Moneda</label>
												<select class="form-select" v-model="formModalLineData.currency"
													@change="selectCurrency">
													<option selected value="0">Seleccione...</option>
													<option :value="currency.internalid" v-for="currency in objCurrencys"
														:key="currency.internalid">{{ currency.name }}</option>
												</select>
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
									<!-- <div class="row">
										<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Impuesto</label>
												<input type="number" class="form-control"
													v-model="formModalLineData.impuesto" @blur="handleblur" />
											</div>
										</div>
										
									</div> -->
									<div class="row">
										<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
											<div class="inputControl mt-2">
												<label for="txtEmpleado" class="form-label">Nota</label>
												<textarea class="form-control" rows="1"
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
									<hr class="line-imp">
									<div v-if="nexus_selected">
										<h4>Impuestos</h4>
										<div class="row">
											<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
												<div class="inputControl mt-2">
													<label for="txtEmpleado" class="form-label">Tipo de impuesto</label>
													<select class="form-select" v-model="formModalLineData.tipoimpuesto"
														@change="selectTipoImpuesto">
														<option selected value="0">Seleccione...</option>
														<option :value="tax.internalid" v-for="tax in objTaxes"
															:key="tax.internalid">{{ tax.name }}</option>
													</select>
												</div>
											</div>
											<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
												<div class="inputControl mt-2">
													<label for="txtEmpleado" class="form-label">Código de impuesto</label>
													<select class="form-select" v-model="formModalLineData.codImpuesto"
														@change="selectCodImp">
														<option selected value="0">Seleccione...</option>
														<option :value="code.internalid" v-for="code in objTaxesCodes"
															:key="code.internalid">{{ code.name }}</option>
													</select>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
												<div class="inputControl mt-2">
													<label for="txtEmpleado" class="form-label">Rate</label>
													<input type="number" class="form-control" disabled
														v-model="formModalLineData.rateTax" />
												</div>
											</div>
											<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
												<div class="inputControl mt-2">
													<label for="txtEmpleado" class="form-label">Importe Neto</label>
													<input type="number" class="form-control" disabled
														v-model="formModalLineData.amount" />
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
												<div class="inputControl mt-2">
													<label for="txtEmpleado" class="form-label">Importe del impuesto</label>
													<input type="number" class="form-control" disabled
														v-model="formModalLineData.amounttax" />
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
			<table class="table table-striped table-bordered tamaño-table">
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
						<td>{{ line.deparmentName }}</td>
						<td>{{ line.categoryName }}</td>
						<td>{{ line.currencyName }}</td>
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
		const urlApi = process.env.VUE_APP_URL_API_LOCAL;
		let modal = null;
		const store = useStore();
		let formModalLineData = ref({});
		let formModallineDataNames = ref({});
		let formData = ref({});
		let objCategories = ref();
		let objNexus = ref();
		let objTaxes = ref();
		let objTaxesCodes = ref();
		let objDeparments = ref();
		let objCurrencys = ref();
		let url_reporte_ns = ref();
		let nexus_selected = ref(false);
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
			console.log(userObj.value);
			modal = new Modal(document.getElementById('myModal'));
			formData.value.entity = userObj.value.internalid;
			formData.value.subsidiary = userObj.value.subsidiary;
			formData.value.supervisorapproval = false;
			formData.value.advanceaccount = "118";
			formData.value.account = "111";
			formData.value.anticipo = false;
			formData.value.nota_cancelacion = "";
			formModalLineData.value.category = 0;
			formModalLineData.value.departamento = 0;
			formModalLineData.value.currency = 0;
			formModalLineData.value.expenseaccount = 0;
			formModalLineData.value.nexus = 0;
			getSubsidiarie(userObj.value.subsidiary);
			getCategoriesList(12);
			getDeparmentsList(userObj.value.subsidiary);
			getCurrencysList();
			getNexusList();
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

		const selectCodImp = async (e) => {
			const taxType = e.target.value;
			formModalLineData.value.rateTax = objTaxesCodes.value[0].rate;
			formModalLineData.value.amounttax = formModalLineData.value.amount * objTaxesCodes.value[0].rate;
			formModalLineData.value.total = formModalLineData.value.amounttax + formModalLineData.value.amount;
		}

		const selectTipoImpuesto = async (e) => {
			const taxType = e.target.value;
			await axios.get(`${urlApi}/api/mongo/taxes/code/${taxType}`)
				.then(function (response) {
					const objR = response.data.taxes;
					console.log("objR", objR[0].taxCodes);
					objTaxesCodes.value = objR[0].taxCodes;
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		const selectCurrency = (e) => {
			const currency = e.target.value;
			let exchange_rate;
			let currency_name;
			for (let curr in objCurrencys.value) {
				if (objCurrencys.value[curr].internalid == currency) {
					exchange_rate = objCurrencys.value[curr].exchangerate;
					currency_name = objCurrencys.value[curr].name;
				}
			}
			formModalLineData.value.exchangerate = exchange_rate;
			formModalLineData.value.currencyName = currency_name;
		}

		const selectCategory = (e) => {
			const category = e.target.value;
			let category_name;
			let expense_name;
			let expenseAccountId;
			for (let cat in objCategories.value) {
				if (objCategories.value[cat].internalid == category) {
					category_name = objCategories.value[cat].name;
					expense_name = objCategories.value[cat].name_expenseAccount;
					expenseAccountId = objCategories.value[cat].expenseAccount;
				}
			}
			formModalLineData.value.categoryName = category_name;
			formModalLineData.value.expenseAccountName = expense_name;
			formModalLineData.value.expenseaccount = expenseAccountId;
		}

		const selectDeparment = (e) => {
			const deparment = e.target.value;
			let deparment_name;
			for (let dep in objDeparments.value) {
				if (objDeparments.value[dep].internalid == deparment) {
					deparment_name = objDeparments.value[dep].name;
				}
			}
			formModalLineData.value.deparmentName = deparment_name;
		}

		const selectNexus = (e) => {
			const nexus = e.target.value;
			if (nexus == 1) {
				formData.value.taxRegName = "FCA9901297P6 (Mexico, Mexico)";
				formData.value.taxRegId = 9;
				nexus_selected.value = true;
				getTaxesList(nexus);
				console.log("taxlist", objTaxes);
			}
		}

		const getSubsidiarie = async (subsidiary) => {
			await axios.get(`${urlApi}/api/mongo/sub/${subsidiary}`)
				.then(function (response) {
					formData.value.subsidiaryName = response.data.Subsidiarias[0].name;
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		const getCategoriesList = async (subsidiary) => {
			await axios.get(`${urlApi}/api/mongo/categories/15`)
				.then(function (response) {
					objCategories.value = response.data.Categorias;
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		const getNexusList = async (subsidiary) => {
			await axios.get(`${urlApi}/api/mongo/nexus`)
				.then(function (response) {
					objNexus.value = response.data.Nexus;
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		const getTaxesList = async (country) => {
			await axios.get(`${urlApi}/api/mongo/taxes/${country}`)
				.then(function (response) {
					objTaxes.value = response.data.taxes;
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		const getDeparmentsList = async (subsidiary) => {
			await axios.get(`${urlApi}/api/mongo/deparments/${subsidiary}`)
				.then(function (response) {
					objDeparments.value = response.data.Deparmentos;
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		const getCurrencysList = async (subsidiary) => {
			await axios.get(`${urlApi}/api/mongo/currencys`)
				.then(function (response) {
					objCurrencys.value = response.data.Monedas;
				})
				.catch(function (error) {
					console.log(error);
				});
		}

		const addExpenseLine = () => {
			const expensedate = new Date(formModalLineData.value.expensedate);
			formModalLineData.value.expensedate = expensedate.toLocaleDateString();

			let objLine = formModalLineData.value;
			lines.value.push(objLine);

			const amount = Number(formModalLineData.value.total);
			console.log(amount);
			totalReport.value += amount;

			formModalLineData.value = {};
			formModalLineData.value.category = 0;
			formModalLineData.value.departamento = 0;
			formModalLineData.value.currency = 0;
			formModalLineData.value.expenseaccount = 0;
			modal.hide();
		}

		const handleCreateReportTest = async () => {
			let objForm = formData.value;
			objForm.expense_list = lines.value;
			formData.value = objForm;
			const trandate = new Date(formData.value.trandate);
			formData.value.trandate = trandate.toLocaleDateString();
			console.log("formData.value", formData.value);
		}

		const handleCreateReport = async () => {
			loader_create.value = true;
			button_Create.value = "Enviando a NS..."

			let objForm = formData.value;
			objForm.expense_list = lines.value;
			formData.value = objForm;
			const trandate = new Date(formData.value.trandate);
			formData.value.trandate = trandate.toLocaleDateString();
			console.log("formData.value", formData.value);
			let url;

			await axios.post(`${urlApi}/api/mongo/report/create`, formData.value)
				.then(function (response) {
					console.log("isSuccessful", response.data.isSuccessful);
					if (response.data.isSuccessful) {
						let objReports = undefined;
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
						const resp = response.data;
						console.log("data", resp.data);
						url = `https://7674262.app.netsuite.com/app/accounting/transactions/exprept.nl?id=${resp.data[0].id_netsuite}&whence=`;
						url_reporte_ns.value = url;
						toaster.show(`Reporte creado correctamente`);
						console.log(response.data);
					} else {
						toasterFailed.show(`Ocurrio un error al crear el reporte`);
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
			selectCurrency,
			selectCategory,
			selectDeparment,
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
			button_Create,
			objCategories,
			objDeparments,
			objCurrencys,
			getSubsidiarie,
			formModallineDataNames,
			url_reporte_ns,
			getNexusList,
			objNexus,
			selectNexus,
			getTaxesList,
			objTaxes,
			selectTipoImpuesto,
			objTaxesCodes,
			selectCodImp,
			handleCreateReportTest,
			nexus_selected
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
	width: 100%;
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

.line-imp {
	color: #091689;
	border-width: 2px;
}
</style>