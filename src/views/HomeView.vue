<template>
	<NavBarComponent />
	<ExpenseReportList v-if="showList" />
	<AproveExpenseReport v-if="showEditExpenseReport" />
	<NewExpenseReport v-if="showNewExpenseReport" />
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { onMounted, computed } from "@vue/runtime-core";

import NavBarComponent from "../components/NavBarComponent";
import ExpenseReportList from "../components/expenseReport/ExpenseReportList";
import AproveExpenseReport from "../components/expenseReport/AproveExpenseReport";
import NewExpenseReport from "../components/expenseReport/NewExpenseReport";


export default {
	name: "HomeView",
	components: {
		NavBarComponent,
		ExpenseReportList,
		AproveExpenseReport,
		NewExpenseReport
	},
	setup() {
		const store = useStore();
		const showList = ref(computed(() => store.state.showList));
		const showEditExpenseReport = ref(computed(() => store.state.showEditExpenseReport));
		const showNewExpenseReport = ref(computed(() => store.state.showNewExpenseReport));

		return {
			showList,
			showEditExpenseReport,
			showNewExpenseReport,
		}
	}
}
</script>

<style>

</style>