<template>
	<div id="factale-edit" class="factale routercontent">
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<BayoForm
			v-if="ready"
			:statusMsg="message"
			:bayobject="factale"
			bayobjecttype="factale"
			@save-bayobject="saveFactale"
		/>
	</div>
</template>

<script>
	import Circle from "vue-loading-spinner/src/components/Circle";
	import BayoForm from "../../components/form/BayoForm";
	import FactaleService from "../../services/FactaleService";

	export default {
		name: "FactaleEdit",
		components: {
			LoadingCircle: Circle,
			BayoForm,
		},
		data() {
			return {
				ready: false,
				factale: {},
				message: "",
			};
		},
		async created() {
			try {
				const accessToken = await this.$auth.getTokenSilently();
				this.factale = await FactaleService.getSingleFactale(
					this.$route.params.id,
					accessToken
				);
				this.message = `Editing Factale "${this.factale.title}"...`;
				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			async saveFactale(updatedFactale) {
				try {
					const accessToken = await this.$auth.getTokenSilently();
					await FactaleService.editFactale(
						this.$route.params.id,
						updatedFactale,
						accessToken
					);
					this.$root.$bvToast.toast(
						`Factale "${this.factale.title}" saved successfully!`,
						{
							title: "Saved",
							toaster: "b-toaster-top-center",
							variant: "primary",
							autoHideDelay: 4000,
						}
					);
					this.$router.push({ path: "/factales/" + this.$route.params.id });
				} catch (err) {
					this.err = err;
					this.$root.$bvToast.toast(
						`We're sorry, something went wrong and we couldn't save the factale. Maybe try again later.`,
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
