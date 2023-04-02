<template>
	<v-row justify="center">
		<v-dialog v-model="innerValue" persistent width="auto">
			<v-card>
				<v-card-title class="text-h5">
					{{ dialogHeader }}
				</v-card-title>
				<v-card-text class="mt-3">
					<div v-show="dialogHeader === 'Add new Story (minimum one task)'">
						<v-row class="justify-space-between">
							<v-tooltip open-delay="5" bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										v-on="on"
										v-bind="attrs"
										@click="numberOfTasks++"
										outlined
										icon
									>
										<v-icon>mdi-plus</v-icon>
									</v-btn>
								</template>
								<p>New Task</p>
							</v-tooltip>
							<v-tooltip open-delay="5" bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										v-show="numberOfTasks > 1"
										v-on="on"
										v-bind="attrs"
										@click="numberOfTasks--"
										outlined
										icon
									>
										<v-icon>mdi-minus</v-icon>
									</v-btn>
								</template>
								<p>Remove Task</p>
							</v-tooltip>
						</v-row>
						<v-row>
							<v-text-field
								v-model="storyName"
								label="Story Name (not nullable)"
								variant="outlined"
							></v-text-field>
						</v-row>
						<v-row v-for="(item, index) in numberOfTasks" :key="item">
							<v-text-field
								v-model="taskNameValues[index]"
								label="Task Name (not nullable)"
								variant="outlined"
							></v-text-field>
							<v-text-field
								v-model="taskEstimateValues[index]"
								@keypress="filter"
								label="Estimate (minimum 1 sec)"
								variant="outlined"
							></v-text-field>
						</v-row>
					</div>
					<v-text-field
						v-show="dialogItems"
						v-for="(item, index) in dialogItems"
						:disabled="item === 'Name' && dialogHeader.startsWith('Update')"
						v-model="dialogItemValues[index]"
						:key="item"
						:label="item"
						variant="outlined"
					></v-text-field>
					<div v-show="actionText" class="text-subtitle-1">
						{{ actionText }}
					</div>
					<v-data-table
						v-show="typeSubItems"
						:key="typeSubItems"
						:items-per-page="5"
						:headers="customSubHeaders"
						:items="customSubItems"
						width="auto"
					>
						<template v-slot:body="{ items }">
							<tbody>
								<tr v-for="item in items" :key="item.UUID">
									<td v-show="item.Name" align="left">{{ item.Name }}</td>
									<td v-show="item.Estimate" align="left">
										{{ item.Estimate }}
									</td>
									<td v-show="item.Status" align="left">{{ item.Status }}</td>
								</tr>
							</tbody>
						</template>
					</v-data-table>
				</v-card-text>
				<v-card-actions class="justify-space-between">
					<!-- <v-spacer></v-spacer> -->
					<v-btn variant="text" @click="actionCancel"> Cancel </v-btn>
					<v-btn
						v-show="actionButtonText"
						:color="actionButtonColor"
						variant="text"
						@click="actionOK"
					>
						{{ actionButtonText }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DialogBox extends Vue {
	// Meant for toggling inner value (show/hide) of the dialog box
	@Prop(Boolean) public value!: boolean;
	// Header of the dialog box
	@Prop(String) dialogHeader!: string;
	// Color of the action button of the dialog box
	@Prop(String) actionButtonColor!: string;
	// Text of the action button of the dialog box
	@Prop(String) actionButtonText!: string;
	// Meant for text fields in a dialog box
	@Prop(Array) dialogItems!: Array<string>;
	// If there is any particular text in the dialog box
	@Prop(String) actionText!: string;
	// UUID of the main item
	@Prop(String) uuid!: string;
	// Items are meant for items in the main data table
	@Prop(String) typeItems!: string;
	// If the text fields have predefined values, otherwise null
	@Prop(Array) values!: Array<string>;
	// Sub headers are meant for nested data table
	@Prop(Array) customSubHeaders!: Array<object>;
	// Sub items are meant for nested data table, hence 'item -> subItem'
	@Prop(String) typeSubItems!: string;
	// Meant for tracking the values in the text fields in the dialog box
	public dialogItemValues: Array<any> = [];
	// Meant for only add story dialog box
	public storyName = "";
	// Meant for only add story dialog box
	public taskNameValues: Array<string> = [];
	// Meant for only add story dialog box
	public taskEstimateValues: Array<number> = [];
	// There should be at least one task for each story. Meant for only add story dialog box
	public numberOfTasks = 1;

	public get innerValue() {
		return this.value;
	}

	public set innerValue(value: boolean) {
		this.$emit("input", value);
	}

	public async filter(evt) {
		evt = evt ? evt : window.event;
		let expect = evt.target.value.toString() + evt.key.toString();

		if (!/^[1-9][0-9]*$/.test(expect)) {
			evt.preventDefault();
		} else {
			return true;
		}
	}

	public async actionCancel() {
		if (this.values) {
			this.dialogItemValues = this.values;
		}
		this.innerValue = !this.innerValue;
	}

	public async actionOK() {
		if (this.dialogHeader.startsWith("Add") && this.typeItems === "todo") {
			for (let index = 0; index < this.dialogItemValues.length; index++) {
				if (this.dialogItemValues[index] === "") {
					this.dialogItemValues[index] = null;
				}
			}
			this.$store.commit("createTodo", this.dialogItemValues);
			this.dialogItemValues = [];
		} else if (
			this.dialogHeader.startsWith("Remove") &&
			this.typeItems === "todo"
		) {
			this.$store.commit("deleteTodo", this.uuid);
		} else if (
			this.dialogHeader.startsWith("Update") &&
			this.typeItems === "todo"
		) {
			for (let index = 0; index < this.dialogItemValues.length; index++) {
				if (this.dialogItemValues[index] === "") {
					this.dialogItemValues[index] = null;
				}
			}
			this.$store.commit("updateTodo", {
				values: this.dialogItemValues,
				uuid: this.uuid,
			});
		} else if (
			this.dialogHeader.startsWith("Add") &&
			this.typeItems === "story"
		) {
			for (let index = 0; index < this.numberOfTasks; index++) {
				if (!this.taskEstimateValues[index]) {
					// if the task estimate is null or '', then it should be automatically 1, as minimum estimate
					this.taskEstimateValues[index] = Number(1);
				}
				if (!this.taskNameValues[index]) {
					// if the task name is null or '', then it should be automatically 'Demo task', as this is not nullable
					this.taskNameValues[index] = "Demo task";
				}
				// if the task estimate number is NaN, then it should be automatically 1, as minimum estimate
				this.taskEstimateValues[index] = Number(this.taskEstimateValues[index])
					? Number(this.taskEstimateValues[index])
					: Number(1);
			}
			if (this.storyName === "") {
				// if the story name is null or '', then it should be automatically 'Demo story', as this is not nullable
				this.storyName = "Demo story";
			}
			this.$store.commit("createStoryTask", {
				storyName: this.storyName,
				taskNames: this.taskNameValues,
				taskEstimates: this.taskEstimateValues,
			});
			this.storyName = "";
			this.taskEstimateValues = [];
			this.taskNameValues = [];
			this.numberOfTasks = 1;
		} else if (
			this.dialogHeader.startsWith("Remove") &&
			this.typeItems === "story"
		) {
			this.$store.commit("deleteStory", this.uuid);
		}

		this.innerValue = !this.innerValue;
	}
	// Sub items are meant for nested data table, hence 'item -> subItem'
	get customSubItems() {
		if (this.typeSubItems === "task") {
			return this.$store.state.tasks.filter(
				(task) => task.StoryUUID === this.uuid
			);
		} else {
			return [];
		}
	}

	mounted() {
		// Track the values in the text fields in the dialog box
		if (this.values) {
			this.dialogItemValues = this.values;
		} else {
			this.dialogItemValues = [];
		}
	}
}
</script>
