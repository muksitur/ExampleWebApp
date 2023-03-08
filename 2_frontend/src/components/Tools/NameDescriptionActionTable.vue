<template>
	<v-data-table
		:items-per-page="5"
		:headers="customHeaders"
		:items="customItems"
	>
		<template v-slot:body="{ items }">
			<tbody>
				<tr v-for="item in items" :key="item">
					<td align="left">{{ item.Name }}</td>
					<td align="left">{{ item.Description }}</td>
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
export default class NameDescriptionActionTable extends Vue {
	@Prop(Array) customHeaders!: Array<object>;
	@Prop(Array) customItems!: Array<object>;
}
</script>
