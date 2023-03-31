<template>
	<stories-page />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StoriesPage from "../components/Pages/StoriesPage.vue";

@Component({
	components: {
		StoriesPage,
	},
})
export default class StoriesView extends Vue {}
</script>
