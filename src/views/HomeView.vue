<template>
	<NavBarComponent />
	<ExpenseReportList v-if="showList" />
	<AproveExpenseReport v-if="showEditExpenseReport" />
	<NewExpenseReport v-if="showNewExpenseReport" />
	<SyncComponent v-if="showSyncComponent" />
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { onMounted, computed } from "@vue/runtime-core";

import NavBarComponent from "../components/NavBarComponent";
import ExpenseReportList from "../components/expenseReport/ExpenseReportList";
import AproveExpenseReport from "../components/expenseReport/AproveExpenseReport";
import NewExpenseReport from "../components/expenseReport/NewExpenseReport";
import SyncComponent from "../components/sync/SyncComponent";


export default {
	name: "HomeView",
	components: {
		NavBarComponent,
		ExpenseReportList,
		AproveExpenseReport,
		NewExpenseReport,
		SyncComponent
	},
	setup() {
		const store = useStore();
		const showList = ref(computed(() => store.state.showList));
		const showEditExpenseReport = ref(computed(() => store.state.showEditExpenseReport));
		const showNewExpenseReport = ref(computed(() => store.state.showNewExpenseReport));
		const showSyncComponent = ref(computed(() => store.state.showSyncComponent));

		return {
			showList,
			showEditExpenseReport,
			showNewExpenseReport,
			showSyncComponent
		}
	}
}
</script>

<style></style>