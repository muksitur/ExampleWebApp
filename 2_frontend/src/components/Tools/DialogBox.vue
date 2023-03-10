<template>
	<v-row justify="center">
		<v-dialog v-model="innerValue" persistent width="auto">
			<v-card>
				<v-card-title class="text-h5">
					{{ dialogHeader }}
				</v-card-title>
				<v-card-text>
					<v-text-field
						v-for="(item, index) in dialogItems"
						v-model="dialogItemValues[index]"
						:key="item"
						:label="item"
						variant="outlined"
					></v-text-field>
				</v-card-text>
				<v-card-actions class="justify-space-between">
					<!-- <v-spacer></v-spacer> -->
					<v-btn variant="text" @click="innerValue = !innerValue">
						Cancel
					</v-btn>
					<v-btn :color="actionButtonColor" variant="text" @click="actionOK">
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
	@Prop(Boolean) public value!: boolean;
	@Prop(String) dialogHeader!: string;
	@Prop(String) actionButtonColor!: string;
	@Prop(String) actionButtonText!: string;
	@Prop(Array) dialogItems!: Array<string>;

	public dialogItemValues: Array<any> = [];

	public dialog = false;

	public get innerValue() {
		return this.value;
	}

	public set innerValue(value: boolean) {
		this.$emit("input", value);
	}

	public async actionOK() {
		if (this.dialogHeader === "Add new Todo") {
			for (let index = 0; index < this.dialogItemValues.length; index++) {
				if (this.dialogItemValues[index] === "") {
					this.dialogItemValues[index] = null;
				}
			}
			this.$store.commit("createTodo", this.dialogItemValues);
		}
		this.innerValue = !this.innerValue;
	}
}
</script>
