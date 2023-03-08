<template>
	<div class="ml-5 mt-5 mr-5">
		<name-description-action-table
			:customHeaders="todoHeaders"
			:customItems="$store.state.todos"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NameDescriptionActionTable from "../Tools/NameDescriptionActionTable.vue";

@Component({
	components: {
		NameDescriptionActionTable,
	},
})
export default class TodosPage extends Vue {
	public get todoHeaders() {
		const headers = [
			{
				text: "Name",
				value: "displayName",
				key: "Name",
			},
			{
				text: "Description",
				value: "displayDescription",
				key: "Description",
			},
			{
				text: "",
				value: "Actions",
				sortable: false,
			},
		];
		// Add the property calculatedWidth that reacts to changes in the cells width
		return headers.map((header) => ({
			...header,
		}));
	}
	mounted() {
		this.$store.commit("getAllTodos");
	}
}
</script>
