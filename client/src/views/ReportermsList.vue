<template>
	<div id="ReportermsView">
		<AddButtons @search-text="searchReporterms" />
		<div v-for="r in reporterms" :key="r._id" :reporterm="r">
			<router-link :to="'/reporterms/' + r._id">
				<ReportermCard :reporterm="r" />
			</router-link>
		</div>
		<AddButtons @search-text="searchReporterms" />
	</div>
</template>

<script>
	import AddButtons from "../components/AddButtons";
	import ReportermCard from "../components/ReportermCard";
	import ReportermService from "../ReportermService";

	export default {
		components: {
			AddButtons,
			ReportermCard,
		},
		props: {
			textToSearch: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
				reporterms: [],
				// textToSearch: "",
				err: "",
			};
		},
		async created() {
			try {
				// Get the access token from the auth wrapper
				const accessToken = await this.$auth.getTokenSilently();

				this.reporterms = await ReportermService.getReporterms(
					this.textToSearch,
					accessToken
				);
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			searchReporterms(searchText) {
				this.$router.push({ query: { search: searchText } });
				location.reload();
			},
		},
	};
</script>

<style></style>
