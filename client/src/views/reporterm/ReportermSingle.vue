<template>
	<div id="reporterm-single" class="reporterm">
		<AddButtons />
		<div class="clear"></div>
		<div class="centeraligned" v-if="!ready">
			<LoadingCircle />
		</div>
		<div id="reporterm-single-content" v-if="ready">
			<b-button :to="'/reporterms/' + this.$route.params.id + '/edit'">Edit</b-button>|
			<b-button @click="deleteReporterm">Delete</b-button>
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
			<img :src="reporterm.image" alt="Reporterm Image" />
			<br />
		</div>
		<AddButtons />
	</div>
</template>

<script>
	import AddButtons from "../../components/AddButtons";
	import Circle from "vue-loading-spinner/src/components/Circle";
	import ReportermService from "../../ReportermService";

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
			async deleteReporterm() {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					await ReportermService.deleteReporterm(this.$route.params.id, accessToken);
				} catch (err) {
					this.err = err;
				}
				this.$router.push({ path: "/reporterms/" });
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
