<template>
	<div id="anecdaynote-edit" class="anecdaynote routercontent">
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<BayoForm
			v-if="ready"
			:statusMsg="message"
			:bayobject="anecdaynote"
			@save-bayobject="saveAnecdaynote"
		/>
	</div>
</template>

<script>
	import Circle from "vue-loading-spinner/src/components/Circle";
	import BayoForm from "../../components/form/BayoForm";
	import AnecdaynoteService from "../../services/AnecdaynoteService";

	export default {
		name: "AnecdaynoteEdit",
		components: {
			LoadingCircle: Circle,
			BayoForm,
		},
		data() {
			return {
				ready: false,
				anecdaynote: {},
				message: "",
			};
		},
		async created() {
			try {
				const accessToken = await this.$auth.getTokenSilently();
				this.anecdaynote = await AnecdaynoteService.getSingleAnecdaynote(
					this.$route.params.id,
					accessToken
				);
				this.message = `Editing Anecdaynote "${this.anecdaynote.title}"...`;
				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			async saveAnecdaynote(updatedAnecdaynote) {
				try {
					const accessToken = await this.$auth.getTokenSilently();
					await AnecdaynoteService.editAnecdaynote(
						this.$route.params.id,
						updatedAnecdaynote,
						accessToken
					);
					this.$root.$bvToast.toast(
						`Anecdaynote "${this.anecdaynote.title}" saved successfully!`,
						{
							title: "Saved",
							toaster: "b-toaster-top-center",
							variant: "primary",
							autoHideDelay: 4000,
						}
					);
					this.$router.push({ path: "/anecdaynotes/" + this.$route.params.id });
				} catch (err) {
					this.err = err;
					this.$root.$bvToast.toast(
						`We're sorry, something went wrong and we couldn't save the anecdaynote. Maybe try again later.`,
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
