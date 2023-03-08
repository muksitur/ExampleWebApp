<template>
	<v-card>
		<v-layout>
			<v-navigation-drawer
				permanent
				:mini-variant.sync="rail"
				@click="rail = false"
			>
				<v-list-item title="John Doe" nav>
					<div class="d-flex">
						<v-img
							style="margin-right: 170px; margin-left: -8px"
							max-width="35"
							src="new_fav_image.jpg"
						></v-img>
						<v-spacer></v-spacer>
						<v-btn @click.stop="rail = !rail" icon
							><v-icon>mdi-chevron-left</v-icon></v-btn
						>
					</div>
				</v-list-item>

				<v-divider></v-divider>

				<v-list nav>
					<v-list-item v-for="item in items" :key="item.title" :to="item.path"
						><v-icon class="mr-5">{{ item.icon }}</v-icon>
						{{ item.title }}</v-list-item
					>
				</v-list>
			</v-navigation-drawer>
		</v-layout>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SideNav extends Vue {
	drawer = false;
	items = [
		{ title: "Home", icon: "mdi-home-outline", path: "/" },
		{ title: "About", icon: "mdi-information-outline", path: "/about" },
		{ title: "Todos", icon: "mdi-calendar-check-outline", path: "/todos" },
	];
	rail = false;
}
</script>
