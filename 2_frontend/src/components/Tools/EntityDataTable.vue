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
				<tr v-for="item in items" :key="item.Name">
					<td v-show="item.Name" align="left">{{ item.Name }}</td>
					<td v-show="item.Description" align="left">{{ item.Description }}</td>
					<td align="right">
						<v-tooltip open-delay="500" bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon v-on="on" v-bind="attrs">
									<v-icon>mdi-calendar-edit-outline</v-icon>
								</v-btn>
							</template>
							<p>Edit</p>
						</v-tooltip>
					</td>
					<td align="left">
						<v-tooltip open-delay="500" bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon v-on="on" v-bind="attrs">
									<v-icon>mdi-trash-can-outline</v-icon>
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

@Component
export default class EntityDataTable extends Vue {
	@Prop(Array) customHeaders!: Array<object>;
	@Prop(String) typeItems!: string;

	get customItems() {
		if (this.typeItems === "todos") {
			return this.$store.state.todos;
		} else {
			return [];
		}
	}
}
</script>
