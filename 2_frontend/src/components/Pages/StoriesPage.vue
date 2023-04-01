<template>
	<div class="ml-5 mt-5 mr-5">
		<v-row>
			<v-col cols="3">
				<v-btn @click="showDialog = !showDialog" outlined>
					<v-icon>mdi-plus</v-icon>
					<span class="pl-2">New Story</span>
				</v-btn>
				<dialog-box
					v-model="showDialog"
					actionButtonColor="success"
					actionButtonText="add"
					typeItems="story"
					dialogHeader="Add new Story (minimum one task)"
				/>
			</v-col>
		</v-row>
		<!-- items are meant for each item in the data table.
		sub-items are meant for nested data table, hence data table inside each item in the data table -->
		<entity-data-table
			class="mt-5"
			:customHeaders="storyHeaders"
			typeItems="story"
			typeSubItems="task"
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
export default class StoriesPage extends Vue {
	public showDialog = false;

	get storyHeaders() {
		const headers = [
			{
				text: "Name",
			},
			{
				text: "Status",
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
		this.$store.commit("getAllStories");
		this.$store.commit("getAllTasks");
		// Since the status of stories and tasks should be visible realtime, it is safe to update store.state every one second.
		// As the lowest estimate of a task is one second.
		setInterval(async () => {
			this.$store.commit("getAllStories");
			this.$store.commit("getAllTasks");
		}, 1000);
	}
}
</script>
