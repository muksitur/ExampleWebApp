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
				</v-card-text>
				<v-card-actions class="justify-space-between">
					<!-- <v-spacer></v-spacer> -->
					<v-btn variant="text" @click="actionCancel"> Cancel </v-btn>
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
	@Prop(String) actionText!: string;
	@Prop(String) uuid!: string;
	@Prop(String) typeItems!: string;
	@Prop(Array) values!: Array<string>;

	public dialogItemValues: Array<any> = [];

	public dialog = false;

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

	mounted() {
		if (this.values) {
			this.dialogItemValues = this.values;
		} else {
			this.dialogItemValues = [];
		}
	}
}
</script>
