<template>
	<div id="reporterm-single" class="reporterm">
		<AddButtons />
		<div class="clear"></div>
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<div id="reporterm-single-content" v-if="ready">
			<b-button :to="`/reporterms/${this.$route.params.id}/edit`" variant="primary">
				<b-icon icon="pencil-square" /> Edit
			</b-button>
			&nbsp;
			<b-button @click="deleteReporterm" variant="danger">
				<b-icon icon="trash" /> Delete
			</b-button>
			<br />
			<br />
			<h2>
				{{
					new Date(reporterm.startDate).toLocaleDateString(undefined, {
						year: "numeric",
						month: "long",
						day: "numeric",
					})
				}}
				-
				{{
					new Date(reporterm.endDate).toLocaleDateString(undefined, {
						year: "numeric",
						month: "long",
						day: "numeric",
					})
				}}
			</h2>
			<h1>{{ reporterm.title }}</h1>
			<br />
			<p id="content-paragraph">{{ reporterm.content }}</p>
			<br />
			<img :src="getImage(reporterm.image, images)" alt="Reporterm Image" />
			<br />
		</div>
		<AddButtons />
	</div>
</template>

<script>
	import AddButtons from "../../components/AddButtons";
	import Circle from "vue-loading-spinner/src/components/Circle";
	import ReportermService from "../../apiservices/ReportermService";

	export default {
		name: "ReportermSingle",
		components: {
			AddButtons,
			LoadingCircle: Circle,
		},
		data() {
			return {
				ready: false,
				reporterm: {},
				err: "",
				images: {
					noImg: require("../../../public/assets/img/default-img.jpg"),
					beach: require("../../../public/assets/img/beach.jpg"),
					mountain: require("../../../public/assets/img/mountain.jpg"),
					graduation: require("../../../public/assets/img/graduation.jpg"),
					heart: require("../../../public/assets/img/heart.jpg"),
					ball: require("../../../public/assets/img/ball.jpg"),
				},
			};
		},
		async created() {
			try {
				const accessToken = await this.$auth.getTokenSilently();

				this.reporterm = await ReportermService.getSingleReporterm(
					this.$route.params.id,
					accessToken
				);

				this.ready = true;
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			getImage: (imgProperty, images) => {
				if (imgProperty in images) {
					return images[imgProperty];
				} else {
					return imgProperty;
				}
			},
			async deleteReporterm() {
				this.$confirm({
					title: `Are you sure?`,
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
	#reporterm-single-content {
		margin: 10px;
		text-align: center;
	}

	#content-paragraph {
		white-space: pre-line;
	}
</style>
