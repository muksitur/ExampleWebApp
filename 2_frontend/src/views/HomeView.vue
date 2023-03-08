<template>
	<start-page />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StartPage from "../components/Pages/StartPage.vue";

@Component({
	components: {
		StartPage,
	},
})
export default class HomeView extends Vue {}
</script>
