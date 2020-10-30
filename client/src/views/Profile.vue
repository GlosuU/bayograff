<template>
	<div
		id="profile"
		class="routercontent content-paragraph fullpagetextview automargin alignlistitems"
	>
		<div class="margin10">
			<img class="margin10" :src="$auth.user.picture" />
			<h2 v-if="google">{{ $auth.user.name }}</h2>
			<p><strong>E-mail:</strong> {{ $auth.user.email }}</p>
			<p v-if="!google">
				If you wish to change your password, log out and then select "Forgot password"
				before logging in again.
			</p>
			<hr />
			<div class="centeraligned" v-if="!ready">
				<LoadingCircle />
			</div>
			<ul v-if="ready">
				<li>Number of Reporterms: {{ nReporterms }}</li>
				<li>Number of Anecdaynotes: {{ nAnecdaynotes }}</li>
				<li>Number of Factales: {{ nFactales }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Circle from "vue-loading-spinner/src/components/Circle";
	import ReportermService from "../services/ReportermService";
	import AnecdaynoteService from "../services/AnecdaynoteService";
	import FactaleService from "../services/FactaleService";

	export default {
		components: {
			LoadingCircle: Circle,
		},
		data() {
			return {
				development: process.env.NODE_ENV == "development",
				google: this.$auth.user.name != this.$auth.user.email,
				nReporterms: -1,
				nAnecdaynotes: -1,
				nFactales: -1,
				ready: false,
			};
		},
		async created() {
			if (this.development) {
				console.log(JSON.stringify(this.$auth.user, null, 2));
			}

			if (this.$nReporterms < 0) {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					this.$nReporterms = await ReportermService.getReportermsTotalCount(accessToken);
				} catch (err) {
					this.$nReporterms = "INFO UNAVAILABLE";
				}
			}
			if (this.$nAnecdaynotes < 0) {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					this.$nAnecdaynotes = await AnecdaynoteService.getAnecdaynotesTotalCount(
						accessToken
					);
				} catch (err) {
					this.$nAnecdaynotes = "INFO UNAVAILABLE";
				}
			}
			if (this.$nFactales < 0) {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					this.$nFactales = await FactaleService.getFactalesTotalCount(accessToken);
				} catch (err) {
					this.$nFactales = "INFO UNAVAILABLE";
				}
			}

			this.nReporterms = this.$nReporterms;
			this.nAnecdaynotes = this.$nAnecdaynotes;
			this.nFactales = this.$nFactales;

			this.ready = true;
		},
	};
</script>

<style></style>
