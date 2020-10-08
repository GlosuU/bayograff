<template>
	<div id="reporterm-new" class="reporterm">
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<BayoForm
			v-if="ready"
			:statusMsg="message"
			:object="reporterm"
			:fromRoute="fromRoute"
			@save-object="saveReporterm"
		/>
	</div>
</template>

<script>
	import Circle from "vue-loading-spinner/src/components/Circle";
	import BayoForm from "../../components/BayoForm";
	import ReportermService from "../../ReportermService";

	export default {
		name: "ReportermEdit",
		components: {
			LoadingCircle: Circle,
			BayoForm,
		},
		data() {
			return {
				ready: false,
				reporterm: {},
				message: "",
				fromRoute: "/reporterms/" + this.$route.params.id,
			};
		},
		async created() {
			try {
				const accessToken = await this.$auth.getTokenSilently();
				this.reporterm = await ReportermService.getSingleReporterm(
					this.$route.params.id,
					accessToken
				);
				this.message = "Editing Reporterm " + this.reporterm.title + "...";
				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			async saveReporterm(updatedReporterm) {
				try {
					const accessToken = await this.$auth.getTokenSilently();
					await ReportermService.editReporterm(
						this.$route.params.id,
						updatedReporterm,
						accessToken
					);
				} catch (err) {
					this.err = err;
				}
				this.$router.push({ path: this.fromRoute });
			},
		},
	};
</script>

<style></style>
