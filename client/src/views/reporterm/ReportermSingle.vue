<template>
	<div id="reporterm-single" class="reporterm routercontent">
		<PrimaryButtons />
		<SecondaryButtons
			:backRoute="backRoute"
			:editRoute="editRoute"
			@delete-object="deleteReporterm"
		/>
		<br />
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<div id="reporterm-single-content" class="centeraligned" v-if="ready">
			<h2>
				{{
					new Date(reporterm.startDate).toLocaleDateString(undefined, {
						year: "numeric",
						month: "long",
						day: "numeric",
					})
				}}
				-
				{{
					new Date(reporterm.endDate).toLocaleDateString(undefined, {
						year: "numeric",
						month: "long",
						day: "numeric",
					})
				}}
			</h2>
			<h1>
				<u>{{ reporterm.title }}</u>
			</h1>
			<br />
			<p
				id="content-paragraph"
				class="singleobjectcontentview automargin alignlistitems"
				v-html="reporterm.content"
			/>
			<img :src="getImage(reporterm.image)" alt="Reporterm Image" class="externalImgBig" />
			<br />
			<br />
			<div class="object-dates">
				<h5>
					Created:
					{{
						new Date(reporterm.createdAt).toLocaleDateString(undefined, {
							year: "numeric",
							month: "long",
							day: "numeric",
						})
					}}
				</h5>
				<h5>
					Last updated:
					{{
						new Date(reporterm.updatedAt).toLocaleDateString(undefined, {
							year: "numeric",
							month: "long",
							day: "numeric",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
							hour12: false,
						})
					}}
				</h5>
			</div>
		</div>
		<br />
		<SecondaryButtons
			:backRoute="backRoute"
			:editRoute="editRoute"
			@delete-object="deleteReporterm"
		/>
		<br />
	</div>
</template>

<script>
	import PrimaryButtons from "../../components/buttons/PrimaryButtons";
	import SecondaryButtons from "../../components/buttons/SecondaryButtons";
	import Circle from "vue-loading-spinner/src/components/Circle";
	import ReportermService from "../../services/ReportermService";
	import ImagesService from "../../services/ImagesService";

	export default {
		name: "ReportermSingle",
		components: {
			PrimaryButtons,
			SecondaryButtons,
			LoadingCircle: Circle,
		},
		data() {
			return {
				ready: false,
				reporterm: {},
				err: "",
				backRoute: "/reporterms",
				editRoute: `/reporterms/${this.$route.params.id}/edit`,
			};
		},
		async created() {
			try {
				const accessToken = await this.$auth.getTokenSilently();

				this.reporterm = await ReportermService.getSingleReporterm(
					this.$route.params.id,
					accessToken
				);

				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			getImage: (img) => ImagesService.getImage(img),
			async deleteReporterm() {
				this.$confirm({
					title: `Are you sure?`,
					message: `This will delete the Reporterm "${this.reporterm.title}"`,
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

								await ReportermService.deleteReporterm(
									this.$route.params.id,
									accessToken
								);

								this.$root.$bvToast.toast(
									`Reporterm "${this.reporterm.title}" deleted successfully!`,
									{
										title: "Deleted",
										toaster: "b-toaster-top-center",
										variant: "primary",
										autoHideDelay: 4000,
									}
								);

								this.$router.push({ path: "/reporterms/" });
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
	};
</script>

<style>
	#content-paragraph {
		white-space: pre-line;
		font: normal 20px Arial, Helvetica, sans-serif;
	}

	.object-dates {
		font-weight: bold;
		font-style: italic;
	}

	.externalImgBig {
		max-width: 600px;
		max-height: 400px;
	}
</style>
