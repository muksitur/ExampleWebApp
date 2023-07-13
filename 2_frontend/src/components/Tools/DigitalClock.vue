<template>
	<div class="container">
		<div class="LCD">
			<div>{{ days }}</div>
			<div>/</div>
			<div>{{ months }}</div>
			<div>/</div>
			<div>{{ years }}</div>
			<v-spacer></v-spacer>
			<div>{{ hours }}</div>
			<div>:</div>
			<div>{{ minutes }}</div>
			<div>:</div>
			<div>{{ seconds }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DigitalClock extends Vue {
	public hours = "";
	public minutes = "";
	public seconds = "";
	public days = "";
	public months = "";
	public years = "";

	public setTime() {
		const date = new Date();
		let hours = date.getHours().toString();
		let minutes = date.getMinutes().toString();
		let seconds = date.getSeconds().toString();
		let days = date.getDate().toString();
		let months = (date.getMonth() + 1).toString();
		let years = date.getFullYear().toString();
		hours = hours.length < 2 ? "0".concat(hours) : hours;
		minutes = minutes.length < 2 ? "0".concat(minutes) : minutes;
		seconds = seconds.length < 2 ? "0".concat(seconds) : seconds;
		days = days.length < 2 ? "0".concat(days) : days;
		months = months.length < 2 ? "0".concat(months) : months;
		years = years.length < 2 ? "0".concat(years) : years;
		this.hours = hours;
		this.minutes = minutes;
		this.seconds = seconds;
		this.days = days;
		this.months = months;
		this.years = years;
	}

	mounted() {
		setInterval(() => this.setTime(), 1000);
	}
}
</script>

<style scoped>
.LCD {
	display: flex;
}
.LCD > div {
	font-family: "alarm clock";
	font-size: x-large;
}
@font-face {
	font-family: "alarm clock";
	src: url("../../../public/fonts/alarm.ttf");
}
</style>
