<template>
	<div id="reporterm-new">
		<BayoForm
			:statusMsg="message"
			:object="newReporterm"
			:fromRoute="fromRoute"
			@save-object="addNewReporterm"
		/>
	</div>
</template>

<script>
	import BayoForm from "../components/BayoForm";
	import ReportermService from "../ReportermService";

	export default {
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
				} catch (err) {
					this.err = err;
				}
				this.$router.push({ path: "/reporterms/" });
			},
		},
	};
</script>

<style></style>
