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
							<font-awesome-icon icon="fa-solid fa-right-from-bracket" class="btnExit" @click="handleExit" />
						</div>
					</div>
				</div>
			</div>
		</nav>
		<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #071689; color: #fff;">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<!-- <li class="nav-item ms-4 me-4">
							<a class="nav-link" :class="{ active: showList }" aria-current="page">Historial
								Informe de gastos</a>
						</li> -->
						<li class="nav-item me-4">
							<button class="btn btn-link link-navbar" @click="handleShowList"
								:class="{ linkActive: showList }">
								<font-awesome-icon icon="fa-solid fa-list" class="icon-reporte" style="width: 32px;" />
								Historial
								Informe de gastos</button>
						</li>
						<!-- <li class="nav-item me-4">
							<a class="nav-link" :class="{ active: showEditExpenseReport }">Aprobación de
								informe de
								gastos</a>
						</li>
						<li class="nav-item me-4">
							<a class="nav-link" :class="{ active: showEditExpenseReport }">Nuevo
								informe de
								gastos</a>
						</li> -->
						<li class="nav-item me-4">
							<button class="btn btn-link link-navbar" @click="handleClickSyncComponent"
								:class="{ linkActive: showSyncComponent }">
								<font-awesome-icon icon="fa-solid fa-rotate" class="icon-reporte" />
								Sincronizar NS-BD</button>
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
		const showSyncComponent = ref(computed(() => store.state.showSyncComponent));
		const userObj = ref(computed(() => store.state.user));

		const handleShowList = () => {
			store.commit("setShowList");
		}

		const handleClickSyncComponent = () => {
			store.commit("setShowSyncComponent");
		}
		const handleExit = () => {
			store.commit("setExit");
		}

		return {
			handleClickSyncComponent,
			handleExit,
			handleShowList,
			showList,
			showEditExpenseReport,
			showNewExpenseReport,
			showSyncComponent,
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

.link-navbar {
	color: #ffffff8a;
	text-decoration: none;

	&:hover {
		color: #ffffff;
	}
}

.linkActive {
	color: #ffffff;
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