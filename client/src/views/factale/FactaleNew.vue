<template>
	<div id="factale-new" class="factale routercontent">
		<BayoForm
			:statusMsg="message"
			:bayobject="newFactale"
			bayobjecttype="factale"
			@save-bayobject="addNewFactale"
		/>
	</div>
</template>

<script>
	import BayoForm from "../../components/form/BayoForm";
	import FactaleService from "../../services/FactaleService";

	export default {
		name: "FactaleNew",
		components: {
			BayoForm,
		},
		data() {
			return {
				message: "Creating New Factale...",
				newFactale: {
					title: "",
					content: "",
					image: "noImg",
				},
			};
		},
		methods: {
			async addNewFactale(newFactale) {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					if (this.$nFactales < 0) {
						this.$nFactales = await FactaleService.getFactalesTotalCount(accessToken);
					}

					if (this.$nFactales < process.env.VUE_APP_MAX_N_FACTALES) {
						await FactaleService.addFactale(newFactale, accessToken);

						this.$root.$bvToast.toast(
							`Factale "${this.newFactale.title}" created successfully!`,
							{
								title: "Created",
								toaster: "b-toaster-top-center",
								variant: "primary",
								autoHideDelay: 4000,
							}
						);

						this.$router.push({ path: "/factales/" });
						this.$nFactales++;
					} else {
						this.$root.$bvToast.toast(
							`You cannot have more than ${process.env.VUE_APP_MAX_N_FACTALES} Factales. Please delete one before creating a new one.`,
							{
								title: "Factales limit reached",
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
						`We're sorry, something went wrong and we couldn't create the factale. Maybe try again later.`,
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
