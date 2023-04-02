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

<script>
export default {
	name: "DigitalClock",
	data() {
		return {
			hours: 0,
			minutes: 0,
			seconds: 0,
			days: 0,
			months: 0,
			years: 0,
		};
	},
	mounted() {
		setInterval(() => this.setTime(), 1000);
	},
	methods: {
		setTime() {
			const date = new Date();
			let hours = date.getHours();
			let minutes = date.getMinutes();
			let seconds = date.getSeconds();
			let days = date.getDate();
			let months = date.getMonth() + 1;
			let years = date.getFullYear();
			hours = hours <= 9 ? `${hours}`.padStart(2, 0) : hours;
			minutes = minutes <= 9 ? `${minutes}`.padStart(2, 0) : minutes;
			seconds = seconds <= 9 ? `${seconds}`.padStart(2, 0) : seconds;
			days = days <= 9 ? `${days}`.padStart(2, 0) : days;
			months = months <= 9 ? `${months}`.padStart(2, 0) : months;
			years = years <= 9 ? `${years}`.padStart(2, 0) : years;
			this.hours = hours;
			this.minutes = minutes;
			this.seconds = seconds;
			this.days = days;
			this.months = months;
			this.years = years;
		},
	},
};
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
