<template>
	<v-app>
		<div class="d-flex">
			<side-nav style="min-width: auto" />
			<v-main>
				<router-view />
			</v-main>
		</div>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideNav from "./components/Tools/SideNavigation.vue";
@Component({
	components: {
		SideNav,
	},
})
export default class App extends Vue {}
</script>
