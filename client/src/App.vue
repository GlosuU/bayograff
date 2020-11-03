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
			// There should be a better way to fix title and icon
			document.title = "Bayograff";
			(function () {
				var link =
					document.querySelector("link[rel*='icon']") || document.createElement("link");
				link.type = "image/png";
				link.rel = "shortcut icon";
				link.href =
					"data:image/png;base64,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";
				document.getElementsByTagName("head")[0].appendChild(link);
			})();
		},
	};
</script>

<style src="./stylesheets/app.css"></style>
<style src="./stylesheets/text.css"></style>
<style src="./stylesheets/media.css"></style>
