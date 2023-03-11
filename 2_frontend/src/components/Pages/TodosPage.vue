<template>
	<div class="ml-5 mt-5 mr-5">
		<v-row>
			<v-col cols="3">
				<v-btn @click="showDialog = !showDialog" outlined>
					<v-icon>mdi-plus</v-icon>
					<span class="pl-2">New Todo</span>
				</v-btn>
				<dialog-box
					v-model="showDialog"
					actionButtonColor="success"
					actionButtonText="add"
					typeItems="todo"
					dialogHeader="Add new Todo"
					:dialogItems="['Name', 'Description']"
				/>
			</v-col>
		</v-row>
		<entity-data-table
			class="mt-5"
			:customHeaders="todoHeaders"
			typeItems="todo"
		/>
		<snack-bar
			v-model="$store.state.errorFlag"
			snackbarColor="error"
			:snackbarMessage="$store.state.errorMessage"
		/>
		<snack-bar
			v-model="$store.state.successFlag"
			snackbarColor="success"
			:snackbarMessage="$store.state.successMessage"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EntityDataTable from "../Tools/EntityDataTable.vue";
import DialogBox from "../Tools/DialogBox.vue";
import SnackBar from "../Tools/SnackBar.vue";

@Component({
	components: {
		EntityDataTable,
		DialogBox,
		SnackBar,
	},
})
export default class TodosPage extends Vue {
	public showDialog = false;

	get todoHeaders() {
		const headers = [
			{
				text: "Name",
			},
			{
				text: "Description",
			},
			{
				text: "",
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
