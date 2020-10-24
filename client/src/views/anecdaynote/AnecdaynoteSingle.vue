<template>
	<div id="anecdaynote-single" class="anecdaynote routercontent">
		<PrimaryButtons :enableSearch="false" />
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<SingleView
			v-if="ready"
			:bayobject="anecdaynote"
			backRoute="/anecdaynotes"
			:editRoute="`/anecdaynotes/${this.$route.params.id}/edit`"
			@delete-bayobject="deleteAnecdaynote"
		/>
	</div>
</template>

<script>
	import PrimaryButtons from "../../components/buttons/PrimaryButtons";
	import Circle from "vue-loading-spinner/src/components/Circle";
	import SingleView from "../../components/templates/SingleView";
	import AnecdaynoteService from "../../services/AnecdaynoteService";

	export default {
		name: "AnecdaynoteSingle",
		components: {
			PrimaryButtons,
			SingleView,
			LoadingCircle: Circle,
		},
		data() {
			return {
				ready: false,
				anecdaynote: {},
				err: "",
			};
		},
		async created() {
			try {
				const accessToken = await this.$auth.getTokenSilently();

				this.anecdaynote = await AnecdaynoteService.getSingleAnecdaynote(
					this.$route.params.id,
					accessToken
				);

				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			async deleteAnecdaynote() {
				this.$confirm({
					title: "Are you sure?",
					message: `This will delete the Anecdaynote "${this.anecdaynote.title}"`,
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

								await AnecdaynoteService.deleteAnecdaynote(
									this.$route.params.id,
									accessToken
								);

								this.$root.$bvToast.toast(
									`Anecdaynote "${this.anecdaynote.title}" deleted successfully!`,
									{
										title: "Deleted",
										toaster: "b-toaster-top-center",
										variant: "primary",
										autoHideDelay: 4000,
									}
								);

								this.$router.push({ path: "/anecdaynotes/" });
								this.$nAnecdaynotes--;
							} catch (err) {
								this.err = err;
								this.$root.$bvToast.toast(
									`We're sorry, something went wrong and we couldn't delete the anecdaynote. Maybe try again later.`,
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
