<template>
	<div id="reporterm-new" class="reporterm">
		<BayoForm
			:statusMsg="message"
			:object="newReporterm"
			:fromRoute="fromRoute"
			@save-object="addNewReporterm"
		/>
	</div>
</template>

<script>
	import BayoForm from "../../components/BayoForm";
	import ReportermService from "../../apiservices/ReportermService";

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
				},
				fromRoute: "/reporterms/",
			};
		},
		methods: {
			async addNewReporterm(newReporterm) {
				try {
					const accessToken = await this.$auth.getTokenSilently();

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
