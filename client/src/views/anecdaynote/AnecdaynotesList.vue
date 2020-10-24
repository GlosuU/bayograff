<template>
	<div id="AnecdaynotesView" class="anecdaynote routercontent">
		<PrimaryButtons :enableSearch="true" @search-text="searchAnecdaynotes" />
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<ListView
			v-if="ready"
			:textToSearch="textToSearch"
			:bayobjects="anecdaynotes"
			bayobjectType="Anecdaynote"
			bayobjectClass="anecdaynotecard"
			rootPath="/anecdaynotes/"
			@sort-date-asc="sortDateASC"
			@sort-date-desc="sortDateDESC"
			@delete-bayobject="deleteAnecdaynote"
		/>
	</div>
</template>

<script>
	import Circle from "vue-loading-spinner/src/components/Circle";
	import PrimaryButtons from "../../components/buttons/PrimaryButtons";
	import ListView from "../../components/templates/ListView";
	import AnecdaynoteService from "../../services/AnecdaynoteService";

	export default {
		name: "AnecdaynotesList",
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
				anecdaynotes: [],
				err: "",
			};
		},
		async created() {
			try {
				const accessToken = await this.$auth.getTokenSilently();

				this.anecdaynotes = await AnecdaynoteService.getAnecdaynotes(
					this.textToSearch,
					accessToken
				);

				if (this.$nAnecdaynotes == -1) {
					this.$nAnecdaynotes = this.anecdaynotes.length;
				}

				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			searchAnecdaynotes(searchText) {
				this.ready = false;
				this.$router.push({ query: { search: searchText } });
			},
			sortDateASC() {
				this.anecdaynotes.sort((a, b) => new Date(a.date) - new Date(b.date));
			},
			sortDateDESC() {
				this.anecdaynotes.sort((a, b) => new Date(b.date) - new Date(a.date));
			},
			async deleteAnecdaynote(a) {
				this.$confirm({
					title: `Are you sure?`,
					message: `This will delete the Anecdaynote "${a.title}"`,
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

								await AnecdaynoteService.deleteAnecdaynote(a._id, accessToken);

								this.$root.$bvToast.toast(
									`Anecdaynote "${a.title}" deleted successfully!`,
									{
										title: "Deleted",
										toaster: "b-toaster-top-center",
										variant: "primary",
										autoHideDelay: 4000,
									}
								);

								// Remove the anecdaynote from the current array
								this.anecdaynotes.splice(this.anecdaynotes.indexOf(a), 1);
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
