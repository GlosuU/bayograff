<template>
	<div id="FactalesView" class="factale routercontent">
		<PrimaryButtons :enableSearch="true" @search-text="searchFactales" />
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<ListView
			v-if="ready"
			:textToSearch="textToSearch"
			:bayobjects="factales"
			bayobjectType="Factale"
			bayobjectClass="factalecard"
			rootPath="/factales/"
			@delete-bayobject="deleteFactale"
		/>
	</div>
</template>

<script>
	import Circle from "vue-loading-spinner/src/components/Circle";
	import PrimaryButtons from "../../components/buttons/PrimaryButtons";
	import ListView from "../../components/templates/ListView";
	import FactaleService from "../../services/FactaleService";

	export default {
		name: "FactalesList",
		components: {
			LoadingCircle: Circle,
			PrimaryButtons,
			ListView,
		},
		props: {
			textToSearch: {
				type: String,
				default: "",
			},
		},
		data() {
			return {
				ready: false,
				factales: [],
				err: "",
			};
		},
		async created() {
			try {
				const accessToken = await this.$auth.getTokenSilently();

				this.factales = await FactaleService.getFactales(this.textToSearch, accessToken);

				if (this.$nFactales == -1) {
					this.$nFactales = this.factales.length;
				}

				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			searchFactales(searchText) {
				this.ready = false;
				this.$router.push({ query: { search: searchText } });
			},
			async deleteFactale(a) {
				this.$confirm({
					title: `Are you sure?`,
					message: `This will delete the Factale "${a.title}"`,
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

								await FactaleService.deleteFactale(a._id, accessToken);

								this.$root.$bvToast.toast(
									`Factale "${a.title}" deleted successfully!`,
									{
										title: "Deleted",
										toaster: "b-toaster-top-center",
										variant: "primary",
										autoHideDelay: 4000,
									}
								);

								// Remove the factale from the current array
								this.factales.splice(this.factales.indexOf(a), 1);
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
		watch: {
			// refresh page if the route changes
			$route: function () {
				this.ready = false;
				location.reload();
			},
		},
	};
</script>

<style></style>
