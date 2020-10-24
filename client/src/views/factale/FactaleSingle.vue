<template>
	<div id="factale-single" class="factale routercontent">
		<PrimaryButtons :enableSearch="false" />
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<SingleView
			v-if="ready"
			:bayobject="factale"
			backRoute="/factales"
			:editRoute="`/factales/${this.$route.params.id}/edit`"
			@delete-bayobject="deleteFactale"
		/>
	</div>
</template>

<script>
	import PrimaryButtons from "../../components/buttons/PrimaryButtons";
	import Circle from "vue-loading-spinner/src/components/Circle";
	import SingleView from "../../components/templates/SingleView";
	import FactaleService from "../../services/FactaleService";

	export default {
		name: "FactaleSingle",
		components: {
			PrimaryButtons,
			SingleView,
			LoadingCircle: Circle,
		},
		data() {
			return {
				ready: false,
				factale: {},
				err: "",
			};
		},
		async created() {
			try {
				const accessToken = await this.$auth.getTokenSilently();

				this.factale = await FactaleService.getSingleFactale(
					this.$route.params.id,
					accessToken
				);

				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			async deleteFactale() {
				this.$confirm({
					title: "Are you sure?",
					message: `This will delete the Factale "${this.factale.title}"`,
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

								await FactaleService.deleteFactale(
									this.$route.params.id,
									accessToken
								);

								this.$root.$bvToast.toast(
									`Factale "${this.factale.title}" deleted successfully!`,
									{
										title: "Deleted",
										toaster: "b-toaster-top-center",
										variant: "primary",
										autoHideDelay: 4000,
									}
								);

								this.$router.push({ path: "/factales/" });
								this.$nFactales--;
							} catch (err) {
								this.err = err;
								this.$root.$bvToast.toast(
									`We're sorry, something went wrong and we couldn't delete the factale. Maybe try again later.`,
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

<style></style>
