<template>
	<div id="ReportermsView" class="reporterm">
		<PrimaryButtons @search-text="searchReporterms" />
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<div class="automargin maxcardsize" v-if="ready">
			<div class="centeraligned" v-if="reporterms.length == 0 && !textToSearch">
				<h4>
					You have not created any reporterms yet. Click "New Reporterm" to create one.
				</h4>
			</div>
			<div class="centeraligned" v-if="textToSearch">
				<h4 v-if="reporterms.length == 0">
					Sorry, no results found for "{{ textToSearch }}"
				</h4>
				<h4 v-if="reporterms.length > 0">Showing results for "{{ textToSearch }}"</h4>
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
								<BayoCard
									:bayobject="lastUpdatedReporterm"
									@edit-object="editReporterm"
									@delete-object="deleteReporterm"
								/>
							</router-link>
						</div>
					</b-collapse>
					<hr />
					<SortButtons
						@sort-date-asc="sortDateASC"
						@sort-date-desc="sortDateDESC"
						@sort-alpha-az="sortAlphaAZ"
						@sort-alpha-za="sortAlphaZA"
						@sort-updated-at-asc="sortUpdatedAtASC"
						@sort-updated-at-desc="sortUpdatedAtDESC"
					/>
				</div>
				<br />
				<div id="reportermslist" class="reportermcard" v-for="r in repsPag" :key="r._id">
					<router-link :to="'/reporterms/' + r._id">
						<BayoCard
							:bayobject="r"
							@edit-object="editReporterm"
							@delete-object="deleteReporterm"
						/>
					</router-link>
				</div>
				<br />
				<b-pagination
					v-model="currentPage"
					:total-rows="reporterms.length"
					:per-page="perPage"
					aria-controls="reportermslist"
					align="center"
				>
				</b-pagination>
			</div>
		</div>
		<br />
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
				lastUpdatedReporterm: {},
				lastUpdatedReportermVisible: false,
				currentPage: 1,
				perPage: 3,
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

				if (this.reporterms.length > 1) {
					this.lastUpdatedReporterm = this.reporterms.reduce((a, b) =>
						new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b
					);
				}

				this.setPerPage();

				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		mounted() {
			window.addEventListener("resize", this.setPerPage);
		},
		computed: {
			repsPag() {
				if (this.reporterms.length > this.perPage) {
					return this.reporterms.slice(
						(this.currentPage - 1) * this.perPage,
						this.currentPage * this.perPage
					);
				} else {
					return this.reporterms;
				}
			},
		},
		methods: {
			setPerPage() {
				if (window.innerWidth > 768) {
					this.perPage = 5;
				} else {
					this.perPage = 3;
				}
			},
			searchReporterms(searchText) {
				this.ready = false;
				this.$router.push({ query: { search: searchText } });
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
			editReporterm(r) {
				this.$router.push({ path: `/reporterms/${r._id}/edit` });
			},
			async deleteReporterm(r) {
				this.$confirm({
					title: `Are you sure?`,
					message: `This will delete the Reporterm "${r.title}"`,
					button: {
						no: "No, cancel",
						yes: "Yes, delete it",
					},
					/**
					 * Callback Function
					 * @param {Boolean} confirm
					 */
					callback: async (confirm) => {
						if (confirm) {
							try {
								const accessToken = await this.$auth.getTokenSilently();

								await ReportermService.deleteReporterm(r._id, accessToken);

								this.$root.$bvToast.toast(
									`Reporterm "${r.title}" deleted successfully!`,
									{
										title: "Deleted",
										toaster: "b-toaster-top-center",
										variant: "primary",
										autoHideDelay: 4000,
									}
								);

								// Remove the reporterm from the current array
								this.reporterms.splice(this.reporterms.indexOf(r), 1);
							} catch (err) {
								this.err = err;
								this.$root.$bvToast.toast(
									`We're sorry, something went wrong and we couldn't delete the reporterm. Maybe try again later.`,
									{
										title: "Error",
										toaster: "b-toaster-top-center",
										variant: "danger",
										autoHideDelay: 5000,
									}
								);
							}
						}
					},
				});
			},
		},
		watch: {
			// refresh page if the route changes
			$route: () => {
				location.reload();
			},
		},
		destroyed() {
			window.removeEventListener("resize", this.setPerPage);
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
