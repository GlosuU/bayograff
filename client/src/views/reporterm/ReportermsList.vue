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
			<div v-if="reporterms.length > 0">
				<div id="lastupdatedrepcollapse" v-if="reporterms.length > 1">
					<b-button
						id="toggleLastUpdCollapse"
						v-b-toggle.lastUpdatedReporterm
						variant="primary"
					>
						{{ lastUpdatedReportermVisible ? "Hide" : "Show" }} your last updated
						Reporterm
						<b-icon v-if="!lastUpdatedReportermVisible" icon="arrow-right" />
						<b-icon v-if="lastUpdatedReportermVisible" icon="arrow-down" />
					</b-button>
					<br /><br />
					<b-collapse id="lastUpdatedReporterm" v-model="lastUpdatedReportermVisible">
						<div class="reportermcard">
							<router-link :to="'/reporterms/' + lastUpdatedReporterm._id">
								<BayoCard :bayobject="lastUpdatedReporterm" />
							</router-link>
						</div>
					</b-collapse>
					<hr />
				</div>
				<SortButtons
					@sort-date-asc="sortDateASC"
					@sort-date-desc="sortDateDESC"
					@sort-alpha-az="sortAlphaAZ"
					@sort-alpha-za="sortAlphaZA"
					@sort-updated-at-asc="sortUpdatedAtASC"
					@sort-updated-at-desc="sortUpdatedAtDESC"
				/>
				<br />
				<div class="reportermcard" v-for="r in reporterms" :key="r._id">
					<router-link :to="'/reporterms/' + r._id">
						<BayoCard :bayobject="r" />
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Circle from "vue-loading-spinner/src/components/Circle";
	import PrimaryButtons from "../../components/PrimaryButtons";
	import SortButtons from "../../components/SortButtons";
	import BayoCard from "../../components/BayoCard";
	import ReportermService from "../../services/ReportermService";

	export default {
		name: "ReportermsList",
		components: {
			LoadingCircle: Circle,
			PrimaryButtons,
			SortButtons,
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
				lastUpdatedReportermVisible: false,
				lastUpdatedReporterm: {},
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

				this.lastUpdatedReporterm = this.reporterms.reduce((a, b) =>
					new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b
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
			sortDateASC() {
				this.reporterms.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
			},
			sortDateDESC() {
				this.reporterms.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
			},
			sortAlphaAZ() {
				this.reporterms.sort((a, b) => a.title.localeCompare(b.title));
			},
			sortAlphaZA() {
				this.reporterms.sort((a, b) => b.title.localeCompare(a.title));
			},
			sortUpdatedAtASC() {
				this.reporterms.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
			},
			sortUpdatedAtDESC() {
				this.reporterms.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
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

	#toggleLastUpdCollapse {
		margin-left: 10px;
	}
</style>
