<template>
	<about-page />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AboutPage from "../components/Pages/AboutPage.vue";

@Component({
	components: {
		AboutPage,
	},
})
export default class AboutView extends Vue {}
</script>
