<template>
	<todos-page />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodosPage from "../components/Pages/TodosPage.vue";

@Component({
	components: {
		TodosPage,
	},
})
export default class TodosView extends Vue {}
</script>
