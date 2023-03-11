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
				<tr v-for="(item, index) in items" :key="item.Name">
					<td v-show="item.Name" align="left">{{ item.Name }}</td>
					<td v-show="item.Description" align="left">{{ item.Description }}</td>
					<td align="right">
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
					<td align="left">
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
	@Prop(Array) customHeaders!: Array<object>;
	@Prop(String) typeItems!: string;

	public showRemoveDialog: Array<boolean> = [];
	public showUpdateDialog: Array<boolean> = [];

	get customItems() {
		if (this.typeItems === "todo") {
			return this.$store.state.todos;
		} else {
			return [];
		}
	}
}
</script>
