<template>
	<div id="reporterm-new">
		<BayoForm
			:statusMsg="message"
			:object="reporterm"
			:fromRoute="fromRoute"
			@save-object="saveReporterm"
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
			return {
				reporterm: {},
				message: "",
				fromRoute: "/reporterms/" + this.$route.params.id,
			};
		},
		async created() {
			try {
				this.reporterm = await ReportermService.getSingleReporterm(this.$route.params.id);
				this.message = "Editing Reporterm " + this.reporterm.title + "...";
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			async saveReporterm(updatedReporterm) {
				try {
					await ReportermService.editReporterm(this.$route.params.id, updatedReporterm);
				} catch (err) {
					this.err = err;
				}
				this.$router.push({ path: this.fromRoute });
			},
		},
	};
</script>

<style></style>
