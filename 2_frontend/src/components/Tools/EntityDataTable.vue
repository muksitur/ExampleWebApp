<template>
	<v-data-table
		:key="typeItems"
		:items-per-page="5"
		:headers="customHeaders"
		:items="customItems"
		width="auto"
	>
		<template v-slot:body="{ items }">
			<tbody>
				<tr v-for="(item, index) in items" :key="item.UUID">
					<td v-show="item.Name" align="left">{{ item.Name }}</td>
					<td v-show="item.Description" align="left">{{ item.Description }}</td>
					<td v-show="item.Status" align="left">{{ item.Status }}</td>
					<td v-show="typeItems === 'story'" align="right">
						<v-tooltip open-delay="5" bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									icon
									v-on="on"
									v-bind="attrs"
									@click="showStoryDialog[index] = !showStoryDialog[index]"
								>
									<v-icon class="pl-3">mdi-eye-outline</v-icon>
									<!-- sub items and sub headers are meant for nested data table, hence data table inside each item in the data table -->
									<dialog-box
										v-model="showStoryDialog[index]"
										typeItems="story"
										:typeSubItems="typeSubItems"
										:dialogHeader="
											'Expand ' +
											typeItems +
											': ' +
											item.Name +
											'(' +
											item.id +
											')'
										"
										:uuid="item.UUID"
										:customSubHeaders="customSubHeaders"
									/>
								</v-btn>
							</template>
							<p>Expand</p>
						</v-tooltip>
					</td>
					<td v-show="typeItems === 'todo'" align="right">
						<v-tooltip open-delay="5" bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									icon
									v-on="on"
									v-bind="attrs"
									@click="showUpdateDialog[index] = !showUpdateDialog[index]"
								>
									<v-icon class="pl-3">mdi-calendar-edit-outline</v-icon>
									<dialog-box
										v-model="showUpdateDialog[index]"
										actionButtonColor="warning"
										actionButtonText="update"
										typeItems="todo"
										:dialogHeader="'Update ' + typeItems + ': ' + item.Name"
										:uuid="item.UUID"
										:dialogItems="['Name', 'Description']"
										:values="[item.Name, item.Description]"
									/>
								</v-btn>
							</template>
							<p>Edit</p>
						</v-tooltip>
					</td>
					<td v-show="typeItems === 'todo'" align="left">
						<v-tooltip open-delay="5" bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									icon
									v-on="on"
									v-bind="attrs"
									@click="showRemoveDialog[index] = !showRemoveDialog[index]"
								>
									<v-icon class="pl-3">mdi-trash-can-outline</v-icon>
									<dialog-box
										v-model="showRemoveDialog[index]"
										actionButtonColor="error"
										:typeItems="typeItems"
										actionButtonText="confirm"
										:dialogHeader="'Remove ' + typeItems + ': ' + item.Name"
										:uuid="item.UUID"
										:actionText="
											'Are you sure that you want to remove ' +
											typeItems +
											': ' +
											item.Name +
											'?'
										"
									/>
								</v-btn>
							</template>
							<p>Remove</p>
						</v-tooltip>
					</td>
				</tr>
			</tbody>
		</template>
	</v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import DialogBox from "./DialogBox.vue";

@Component({
	components: {
		DialogBox,
	},
})
export default class EntityDataTable extends Vue {
	// Headers are meant for main data table
	@Prop(Array) customHeaders!: Array<object>;
	// Items are meant for items in the main data table
	@Prop(String) typeItems!: string;
	// Sub items are meant for nested data table, hence 'item -> subItem'
	@Prop(String) typeSubItems!: string;
	// Meant for toggling the remove/delete item dialog box
	public showRemoveDialog: Array<boolean> = [];
	// Meant for toggling the update item dialog box
	public showUpdateDialog: Array<boolean> = [];
	// Meant for toggling the sub items data table dialog box
	public showStoryDialog: Array<boolean> = [];
	// Sub headers are meant for nested data table
	get customSubHeaders() {
		if (this.typeSubItems === "task") {
			return [
				{
					text: "Task Name",
				},
				{
					text: "Estimate",
				},
				{
					text: "Status",
				},
				{
					text: "",
					sortable: false,
				},
			];
		} else {
			return [];
		}
	}
	// Items are meant for items in the main data table
	get customItems() {
		if (this.typeItems === "todo") {
			return this.$store.state.todos;
		} else if (this.typeItems === "story") {
			return this.$store.state.stories;
		} else {
			return [];
		}
	}
}
</script>
