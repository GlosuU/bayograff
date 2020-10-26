<template>
	<div id="bayoheader">
		<div class="floatLeft">
			<h1><strong>Bayograff</strong></h1>
			<h2>- Jot down your memories. Fast and simple.</h2>
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
	};
</script>

<style scoped>
	#bayoheader {
		padding: 20px;
		background-color: aquamarine;
	}
</style>
