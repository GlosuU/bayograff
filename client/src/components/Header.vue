<template>
	<div id="bayoheader">
		<div class="floatLeft">
			<router-link to="/">
				<h1><img :src="logo" alt="Logo" /> <strong>Bayograff</strong></h1>
				<h2>- Jot down your memories. Fast and simple.</h2>
			</router-link>
		</div>
		<Login />
		<div class="clear" />
	</div>
</template>

<script>
	import Login from "./buttons/Login";

	export default {
		components: {
			Login,
		},
		data() {
			return {
				logo: require("../../public/assets/img/logo.png"),
			};
		},
	};
</script>

<style scoped>
	#bayoheader {
		padding: 20px;
		background-color: aquamarine;
	}

	#bayoheader a {
		margin: 0px;
		color: black;
	}

	#bayoheader a:hover {
		text-decoration: none;
	}
</style>
