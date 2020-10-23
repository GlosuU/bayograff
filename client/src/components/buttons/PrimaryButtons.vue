<template>
	<div id="primarybuttons" class="margin10 bayobtns">
		<b-button @click="go2NewReporterm" variant="dark">
			<b-icon icon="journal-plus" /> New Reporterm
		</b-button>
		<b-button variant="dark"> <b-icon icon="file-earmark-plus" /> New Anecdaynote</b-button>
		<b-button variant="dark"> <b-icon icon="patch-plus" /> New Factale</b-button>
		<b-form v-if="enableSearch" @submit="searchText" inline>
			<b-form-input
				v-model="textToSearch"
				class="mr-sm-2"
				placeholder="Search by text"
				required
			/>
			<b-button class="my-2 my-sm-0" type="submit">
				<b-icon icon="search" /> Search
			</b-button>
		</b-form>
		<div class="clear" />
	</div>
</template>

<script>
	import ReportermService from "../../services/ReportermService";

	export default {
		props: ["enableSearch"],
		data() {
			return {
				textToSearch: "",
			};
		},
		methods: {
			searchText(evt) {
				evt.preventDefault();
				this.$emit("search-text", this.textToSearch);
			},
			async go2NewReporterm() {
				if (this.$nReporterms < 0) {
					try {
						const accessToken = await this.$auth.getTokenSilently();
						this.$nReporterms = await ReportermService.getReportermsTotalCount(
							accessToken
						);
					} catch (err) {
						this.err = err;
						this.$root.$bvToast.toast(
							`We're sorry, something went wrong and we can't create new reporterms. Maybe try again later.`,
							{
								title: "Error",
								toaster: "b-toaster-top-center",
								variant: "danger",
								autoHideDelay: 5000,
							}
						);
					}
				}
				if (this.$nReporterms < process.env.VUE_APP_MAX_N_REPORTERMS) {
					this.$router.push({ path: "/reporterms/new" });
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
			},
		},
	};
</script>

<style>
	#primarybuttons form {
		float: right;
	}
</style>
