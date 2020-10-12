<template>
	<div id="ReportermsView" class="reporterm">
		<PrimaryButtons @search-text="searchReporterms" />
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<div class="centeraligned maxcardsize" v-if="ready">
			<div v-if="reporterms.length == 0">
				<h4>
					You have not created any reporterms yet. Click "New Reporterm" to create one.
				</h4>
			</div>
			<div class="reportermcard" v-for="r in reporterms" :key="r._id">
				<router-link :to="'/reporterms/' + r._id">
					<BayoCard :bayobject="r" />
				</router-link>
			</div>
		</div>
		<PrimaryButtons @search-text="searchReporterms" />
	</div>
</template>

<script>
	import PrimaryButtons from "../../components/PrimaryButtons";
	import Circle from "vue-loading-spinner/src/components/Circle";
	import BayoCard from "../../components/BayoCard";
	import ReportermService from "../../services/ReportermService";

	export default {
		name: "ReportermsList",
		components: {
			PrimaryButtons,
			LoadingCircle: Circle,
			BayoCard,
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

<style scoped>
	.reportermcard {
		border: 5px solid transparent;
	}

	.reportermcard:hover {
		border: 5px solid red;
	}

	.reportermcard a {
		color: black;
	}

	.reportermcard a:hover {
		text-decoration: none;
		color: darkred;
	}
</style>
