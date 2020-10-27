<template>
	<div id="app">
		<vue-confirm-dialog />
		<Header />
		<NavBar v-if="$auth.isAuthenticated" />
		<router-view />
		<Footer />
	</div>
</template>

<script>
	import Header from "./components/Header";
	import NavBar from "./components/NavBar";
	import Footer from "./components/Footer";

	export default {
		components: {
			Header,
			NavBar,
			Footer,
		},
	};
</script>

<style src="./stylesheets/app.css"></style>
<style src="./stylesheets/text.css"></style>
<style src="./stylesheets/media.css"></style>
