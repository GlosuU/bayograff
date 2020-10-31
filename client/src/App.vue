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
		title: "Bayograff",
		components: {
			Header,
			NavBar,
			Footer,
		},
		created() {
			// Should be a better way to fix title and icon
			document.title = "Bayograff";
			(function () {
				var link =
					document.querySelector("link[rel*='icon']") || document.createElement("link");
				link.type = "image/png";
				link.rel = "shortcut icon";
				link.href = "https://bayograff.herokuapp.com/img/ball.030e5034.jpg";
				document.getElementsByTagName("head")[0].appendChild(link);
			})();
		},
	};
</script>

<style src="./stylesheets/app.css"></style>
<style src="./stylesheets/text.css"></style>
<style src="./stylesheets/media.css"></style>
