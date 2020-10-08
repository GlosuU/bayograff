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

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		background-color: beige;
		padding-bottom: 20px;
	}

	.clear {
		clear: both;
		margin: 20px;
	}

	.reporterm {
		background-color: lightpink;
	}

	.anecdaynote {
		background-color: lightskyblue;
	}

	.factale {
		background-color: lightgreen;
	}

	.pushToRight {
		margin-left: 10px;
	}

	.centeraligned {
		margin: auto;
	}
</style>
