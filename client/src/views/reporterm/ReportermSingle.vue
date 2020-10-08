<template>
	<div id="reporterm-single" class="reporterm">
		<AddButtons />
		<div class="clear"></div>
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<div id="reporterm-single-content" v-if="ready">
			<b-button :to="'/reporterms/' + this.$route.params.id + '/edit'">Edit</b-button>|
			<b-button @click="deleteReporterm">Delete</b-button>
			<br />
			<br />
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
			<h1>{{ reporterm.title }}</h1>
			<br />
			<p id="content-paragraph">{{ reporterm.content }}</p>
			<br />
			<img :src="reporterm.image" alt="Reporterm Image" />
			<br />
		</div>
		<AddButtons />
	</div>
</template>

<script>
	import AddButtons from "../../components/AddButtons";
	import Circle from "vue-loading-spinner/src/components/Circle";
	import ReportermService from "../../apiservices/ReportermService";

	export default {
		name: "ReportermSingle",
		components: {
			AddButtons,
			LoadingCircle: Circle,
		},
		data() {
			return {
				ready: false,
				reporterm: {},
				err: "",
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
	#reporterm-single-content {
		margin: 10px;
		text-align: center;
	}

	#content-paragraph {
		white-space: pre-line;
	}
</style>
