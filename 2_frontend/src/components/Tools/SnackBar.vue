<template>
	<div class="text-center">
		<v-snackbar v-model="innerValue" :timeout="4000" :color="snackbarColor">
			{{ snackbarMessage }}
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SnackBar extends Vue {
	@Prop(String) snackbarColor!: string;
	@Prop(String) snackbarMessage!: string;
	@Prop(Boolean) public value!: boolean;
	public get innerValue() {
		return this.value;
	}
	public set innerValue(value: boolean) {
		this.$emit("input", value);
	}
}
</script>
