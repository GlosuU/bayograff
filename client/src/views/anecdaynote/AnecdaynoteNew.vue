<template>
	<div id="anecdaynote-new" class="anecdaynote routercontent">
		<BayoForm
			:statusMsg="message"
			:bayobject="newAnecdaynote"
			@save-bayobject="addNewAnecdaynote"
		/>
	</div>
</template>

<script>
	import BayoForm from "../../components/form/BayoForm";
	import AnecdaynoteService from "../../services/AnecdaynoteService";

	export default {
		name: "AnecdaynoteNew",
		components: {
			BayoForm,
		},
		data() {
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

			return {
				message: "Creating New Anecdaynote...",
				newAnecdaynote: {
					date: today,
					title: "",
					content: "",
					image: "noImg",
				},
			};
		},
		methods: {
			async addNewAnecdaynote(newAnecdaynote) {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					if (this.$nAnecdaynotes < 0) {
						this.$nAnecdaynotes = await AnecdaynoteService.getAnecdaynotesTotalCount(
							accessToken
						);
					}

					if (this.$nAnecdaynotes < process.env.VUE_APP_MAX_N_ANECDAYNOTES) {
						await AnecdaynoteService.addAnecdaynote(newAnecdaynote, accessToken);

						this.$root.$bvToast.toast(
							`Anecdaynote "${this.newAnecdaynote.title}" created successfully!`,
							{
								title: "Created",
								toaster: "b-toaster-top-center",
								variant: "primary",
								autoHideDelay: 4000,
							}
						);

						this.$router.push({ path: "/anecdaynotes/" });
						this.$nAnecdaynotes++;
					} else {
						this.$root.$bvToast.toast(
							`You cannot have more than ${process.env.VUE_APP_MAX_N_ANECDAYNOTES} Anecdaynotes. Please delete one before creating a new one.`,
							{
								title: "Anecdaynotes limit reached",
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
						`We're sorry, something went wrong and we couldn't create the anecdaynote. Maybe try again later.`,
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
