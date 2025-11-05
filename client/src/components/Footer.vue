<template>
	<div id="bayofooter" class="centeraligned">
		<h5>
			Bayograff is built with Vue, Node.js, and Express. It is free and open source. It is
			developed and maintained by <a href="https://christiangreciano.com" target="_blank">Christian Greciano</a>.
		</h5>

		<div class="footerlist automargin align-items-center">
			<router-link to="/about" class="btn btn-social btn-reddit blacklink">
				<span class="fa-reddit"><b-icon icon="info-circle" /></span>About
			</router-link>
			<a href="mailto:bayograff.website@gmail.com" class="btn btn-social btn-odnoklassniki">
				<span class="fa fa-odnoklassniki"><img :src="icons.gmail" /></span>E-mail
			</a>
			<a
				href="https://github.com/GlosuU/bayograff"
				target="_blank"
				class="btn btn-social btn-github"
			>
				<span class="fa fa-github"><img :src="icons.github" /></span>GitHub
			</a>
			<a href="https://x.com/cgrecianotech" target="_blank" class="btn btn-social btn-twitter">
				<span class="fa fa-twitter"><img :src="icons.twitter" /></span>X/Twitter
			</a>
			<b-button variant="transparent">
				<DonateButton :big="true" />
			</b-button>
		</div>
	</div>
</template>

<script>
	import ImagesService from "../services/ImagesService";
	import DonateButton from "./buttons/DonateButton";

	export default {
		components: {
			DonateButton,
		},
		data() {
			return {
				icons: ImagesService.getSocialIcons(),
			};
		},
	};
</script>

<style scoped>
	#bayofooter {
		padding: 20px;
		color: white;
		background-color: peru;
	}

	.blacklink {
		color: black;
	}
</style>
