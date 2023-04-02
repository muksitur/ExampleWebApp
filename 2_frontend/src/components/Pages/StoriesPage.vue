<template>
	<div class="ml-5 mt-5 mr-5">
		<v-row class="justify-space-between">
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
			<v-col cols="3">
				<!-- the clock adds better UI experience to the stats -->
				<digital-clock />
			</v-col>
		</v-row>
		<v-row>
			<v-text-field
				v-model="storiesCreatedPerSecond"
				label="Number of Stories Created/sec"
				disabled
				variant="outlined"
			></v-text-field>
			<v-text-field
				v-model="storiesClosedPerSecond"
				label="Number of Stories Closed/sec"
				disabled
				variant="outlined"
			></v-text-field>
			<v-text-field
				v-model="storiesClosed"
				label="Number of Closed Stories"
				disabled
				variant="outlined"
			></v-text-field>
			<v-text-field
				v-model="storiesOpen"
				label="Number of Open Stories"
				disabled
				variant="outlined"
			></v-text-field>
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
import DigitalClock from "../Tools/DigitalClock.vue";

@Component({
	components: {
		EntityDataTable,
		DialogBox,
		SnackBar,
		DigitalClock,
	},
})
export default class StoriesPage extends Vue {
	public showDialog = false;
	public storiesCreatedPerSecond = 0;
	public storiesClosedPerSecond = 0;
	public storiesOpen = 0;
	public storiesClosed = 0;

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
		let storiesOpen = this.$store.state.stories.filter(
			(story) => story.Status === "Open"
		);
		let storiesClosed = this.$store.state.stories.filter(
			(story) => story.Status === "Close"
		);
		this.storiesOpen = storiesOpen.length;
		this.storiesClosed = storiesClosed.length;
		// Since the status of stories and tasks should be visible realtime, it is safe to update store.state every one second.
		// As the lowest estimate of a task is one second.
		setInterval(async () => {
			this.$store.commit("getAllStories");
			this.$store.commit("getAllTasks");
			storiesOpen = this.$store.state.stories.filter(
				(story) => story.Status === "Open"
			);
			storiesClosed = this.$store.state.stories.filter(
				(story) => story.Status === "Close"
			);
			this.storiesCreatedPerSecond =
				storiesOpen.length - this.storiesOpen > 0
					? storiesOpen.length - this.storiesOpen
					: 0;
			this.storiesClosedPerSecond =
				this.storiesClosedPerSecond === this.storiesClosed
					? 0
					: storiesClosed.length - this.storiesClosed;
			this.storiesOpen = storiesOpen.length;
			this.storiesClosed = storiesClosed.length;
		}, 1000);
	}
}
</script>
