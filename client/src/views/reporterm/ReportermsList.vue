<template>
	<div id="ReportermsView" class="reporterm">
		<AddButtons @search-text="searchReporterms" />
		<div class="pushToRight" v-if="!ready">
			<LoadingCircle />
		</div>
		<div class="pushToRight" v-if="ready">
			<div v-if="reporterms.length == 0">
				<h4>
					You have not created any reporterms yet. Click "New Reporterm" to create one.
				</h4>
			</div>
			<div v-for="r in reporterms" :key="r._id" :reporterm="r">
				<router-link :to="'/reporterms/' + r._id">
					<ReportermCard :reporterm="r" />
				</router-link>
			</div>
		</div>
		<AddButtons @search-text="searchReporterms" />
	</div>
</template>

<script>
	import AddButtons from "../../components/AddButtons";
	import Circle from "vue-loading-spinner/src/components/Circle";
	import ReportermCard from "../../components/ReportermCard";
	import ReportermService from "../../ReportermService";

	export default {
		name: "ReportermsList",
		components: {
			AddButtons,
			LoadingCircle: Circle,
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
				ready: false,
				reporterms: [],
				// textToSearch: "",
				err: "",
			};
		},
		async created() {
			try {
				// Get the access token from the auth wrapper
				const accessToken = await this.$auth.getTokenSilently();
				// console.log("accessToken", accessToken);

				this.reporterms = await ReportermService.getReporterms(
					this.textToSearch,
					accessToken
				);

				this.ready = true;
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

<style>
	.pushToRight {
		margin-left: 10px;
	}
</style>
