<template>
	<div id="reporterm-new" class="reporterm routercontent">
		<BayoForm
			:statusMsg="message"
			:bayobject="newReporterm"
			bayobjecttype="reporterm"
			@save-bayobject="addNewReporterm"
		/>
	</div>
</template>

<script>
	import BayoForm from "../../components/form/BayoForm";
	import ReportermService from "../../services/ReportermService";

	export default {
		name: "ReportermNew",
		components: {
			BayoForm,
		},
		data() {
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			const start = new Date(today);
			start.setMonth(start.getMonth() - 1);
			const end = new Date(today);

			return {
				message: "Creating New Reporterm...",
				newReporterm: {
					startDate: start,
					endDate: end,
					title: "",
					content: "",
					image: "noImg",
				},
			};
		},
		methods: {
			async addNewReporterm(newReporterm) {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					if (this.$nReporterms < 0) {
						this.$nReporterms = await ReportermService.getReportermsTotalCount(
							accessToken
						);
					}

					if (this.$nReporterms < process.env.VUE_APP_MAX_N_REPORTERMS) {
						await ReportermService.addReporterm(newReporterm, accessToken);

						this.$root.$bvToast.toast(
							`Reporterm "${this.newReporterm.title}" created successfully!`,
							{
								title: "Created",
								toaster: "b-toaster-top-center",
								variant: "primary",
								autoHideDelay: 4000,
							}
						);

						this.$router.push({ path: "/reporterms/" });
						this.$nReporterms++;
					} else {
						this.$root.$bvToast.toast(
							`You cannot have more than ${process.env.VUE_APP_MAX_N_REPORTERMS} Reporterms. Please delete one before creating a new one.`,
							{
								title: "Reporterms limit reached",
								toaster: "b-toaster-top-center",
								variant: "danger",
								autoHideDelay: 5000,
							}
						);
					}
				} catch (err) {
					this.err = err;
					// console.err(err);
					this.$root.$bvToast.toast(
						`We're sorry, something went wrong and we couldn't create the reporterm. Maybe try again later.`,
						{
							title: "Error",
							toaster: "b-toaster-top-center",
							variant: "danger",
							autoHideDelay: 5000,
						}
					);
				}
			},
		},
	};
</script>

<style></style>
