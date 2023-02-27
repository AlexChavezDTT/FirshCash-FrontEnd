<template>
	<div class="sticky-top">
		<nav class="navbar navbar-light" style="background-color: #fff;">
			<div class="container-fluid">
				<router-link to="/" class="navbar-brand"><img src="../assets/firshcash_logo.jpeg" alt="" width="130" />
				</router-link>
				<div class="d-flex">
					<div class="row">
						<hr />
					</div>
					<div class="row">
						<div class="col-3">
							<font-awesome-icon icon="fa-solid fa-user-tie" style="font-size: 40px ; color: #071689;" />
						</div>
						<div class="col-6" style="font-size:11px; font-weight: bold; margin: auto;">
							<center>
								{{ userObj.entityid }}
								<br>
								Administrador
							</center>
						</div>
						<div class="col-3">
							<font-awesome-icon icon="fa-solid fa-right-from-bracket" class="btnExit" />
						</div>
					</div>
				</div>
			</div>
		</nav>
		<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #071689; color: #fff;">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<li class="nav-item ms-4 me-4">
							<a class="nav-link" :class="{ active: showList }" aria-current="page">Historial
								Informe de gastos</a>
						</li>
						<li class="nav-item me-4">
							<a class="nav-link" :class="{ active: showEditExpenseReport }">Aprobación de
								informe de
								gastos</a>
						</li>
						<li class="nav-item me-4">
							<a class="nav-link" :class="{ active: showEditExpenseReport }">Nuevo
								informe de
								gastos</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<router-view />
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
	name: "NavBarComponent",
	components: {},
	setup() {
		const store = useStore();
		const showList = ref(computed(() => store.state.showList));
		const showEditExpenseReport = ref(computed(() => store.state.showEditExpenseReport));
		const showNewExpenseReport = ref(computed(() => store.state.showNewExpenseReport));
		const userObj = ref(computed(() => store.state.user));

		return {
			showList,
			showEditExpenseReport,
			showNewExpenseReport,
			userObj,
		}
	}
}
</script>

<style lang="scss" scoped>
hr {
	border: none;
	border-left: 4px solid hsla(246, 61%, 39%, 100);
	height: 100%;
	width: 1px;
}

.btnExit {
	color: #071689;
	font-size: 40px;

	&:hover {
		cursor: pointer;
		color: #384189;
	}
}
</style>