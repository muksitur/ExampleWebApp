<template>
	<v-row justify="center">
		<v-dialog v-model="innerValue" persistent width="auto">
			<v-card>
				<v-card-title class="text-h5">
					{{ dialogHeader }}
				</v-card-title>
				<v-card-text>
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

	public get innerValue() {
		return this.value;
	}

	public set innerValue(value: boolean) {
		this.$emit("input", value);
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
