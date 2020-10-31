<template>
	<div id="reporterm-single" class="reporterm routercontent">
		<PrimaryButtons :enableSearch="false" :enableSidebar="true" :sidebar="'sidebar'" />
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<SingleView
			v-if="ready"
			:bayobject="reporterm"
			bayobjecttype="reporterm"
			backRoute="/reporterms"
			:editRoute="`/reporterms/${this.$route.params.id}/edit`"
			@delete-bayobject="deleteReporterm"
		/>
		<b-sidebar
			id="sidebar"
			title="Anecdaynotes in this Reporterm"
			header-class="sidebar-header centeraligned"
			body-class="anecdaynote"
			right
			shadow
			lazy
			no-header-close
			backdrop
			backdrop-variant="transparent"
		>
			<SmallCard v-for="a in anecdaynotes" :key="a._id" :anecdaynote="a" />
			<h5 v-if="anecdaynotes.length == 0" class="margin10 magentatext">
				No registered Anecdaynotes happened during this Reporterm.
			</h5>
		</b-sidebar>
	</div>
</template>

<script>
	import PrimaryButtons from "../../components/buttons/PrimaryButtons";
	import Circle from "vue-loading-spinner/src/components/Circle";
	import SingleView from "../../components/templates/SingleView";
	import SmallCard from "../../components/templates/SmallCard";
	import ReportermService from "../../services/ReportermService";
	import AnecdaynoteService from "../../services/AnecdaynoteService";

	export default {
		name: "ReportermSingle",
		components: {
			PrimaryButtons,
			SingleView,
			SmallCard,
			LoadingCircle: Circle,
		},
		data() {
			return {
				ready: false,
				sidebarVisible: false,
				reporterm: {},
				anecdaynotes: [],
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

				this.anecdaynotes = await AnecdaynoteService.getAnecdaynotesInReporterm(
					this.reporterm,
					accessToken
				);

				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			showSidebar() {
				this.sidebarVisible = true;
			},
			async deleteReporterm() {
				this.$confirm({
					title: "Are you sure?",
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
	};
</script>

<style>
	.sidebar-header {
		background-color: darkblue;
		color: white;
	}
</style>
