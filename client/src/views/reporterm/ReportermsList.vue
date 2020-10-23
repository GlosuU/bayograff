<template>
	<div id="ReportermsView" class="reporterm routercontent">
		<PrimaryButtons :enableSearch="true" @search-text="searchReporterms" />
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<ListView
			v-if="ready"
			:textToSearch="textToSearch"
			:bayobjects="reporterms"
			bayobjectType="Reporterm"
			bayobjectClass="reportermcard"
			rootPath="/reporterms/"
			@sort-date-asc="sortDateASC"
			@sort-date-desc="sortDateDESC"
			@delete-bayobject="deleteReporterm"
		/>
	</div>
</template>

<script>
	import Circle from "vue-loading-spinner/src/components/Circle";
	import PrimaryButtons from "../../components/buttons/PrimaryButtons";
	import ListView from "../../components/templates/ListView";
	import ReportermService from "../../services/ReportermService";

	export default {
		name: "ReportermsList",
		components: {
			LoadingCircle: Circle,
			PrimaryButtons,
			ListView,
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

				if (this.$nReporterms == -1) {
					this.$nReporterms = this.reporterms.length;
				}

				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
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
								this.$nReporterms--;
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
			$route: function () {
				this.ready = false;
				location.reload();
			},
		},
	};
</script>

<style>
	.reportermcard:hover {
		border: 5px solid red;
	}

	.reportermcard a:hover {
		text-decoration: none;
		color: darkred;
	}
</style>
