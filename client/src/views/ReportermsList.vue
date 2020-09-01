<template>
	<div id="ReportermsView">
		<AddButtons />
		<div class="clear"></div>
		<div v-for="r in reporterms" :key="r._id" :reporterm="r">
			<router-link :to="'/reporterms/' + r._id">
				<ReportermCard :reporterm="r" />
			</router-link>
		</div>
		<AddButtons />
	</div>
</template>

<script>
	import AddButtons from "../components/AddButtons";
	import ReportermCard from "../components/ReportermCard";
	import ReportermService from "../ReportermService";

	export default {
		components: {
			AddButtons,
			ReportermCard,
		},
		data() {
			return {
				look: "",
				reporterms: [],
				err: "",
			};
		},
		async created() {
			try {
				this.reporterms = await ReportermService.getReporterms();
			} catch (err) {
				this.err = err;
			}
		},
	};
</script>

<style>
	.clear {
		clear: both;
		margin: 20px;
	}
</style>
