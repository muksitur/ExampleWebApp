<template>
	<v-container>
		<v-row class="text-center mt-5 justify-space-between" cols="12">
			<v-col
				v-for="item in items"
				:key="item.title"
				:cols="$vuetify.breakpoint.mdAndDown ? 12 : 3"
			>
				<v-tooltip open-delay="500" bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-card v-on="on" v-bind="attrs" :to="item.path">
							<v-icon size="200">{{ item.icon }}</v-icon>
						</v-card>
					</template>
					<p>{{ item.title }}</p>
				</v-tooltip>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class StartPage extends Vue {
	items = [
		{ title: "Home", icon: "mdi-home-outline", path: "/" },
		{ title: "About", icon: "mdi-information-outline", path: "/about" },
		{ title: "Todos", icon: "mdi-calendar-check-outline", path: "/todos" },
	];
}
</script>
