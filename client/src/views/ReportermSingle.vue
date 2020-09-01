<template>
	<div id="reporterm-single">
		<AddButtons />
		<div class="clear"></div>
		<div id="reporterm-single-content">
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
	import AddButtons from "../components/AddButtons";
	import ReportermService from "../ReportermService";

	export default {
		components: {
			AddButtons,
		},
		data() {
			return {
				reporterm: {},
				err: "",
			};
		},
		async created() {
			try {
				this.reporterm = await ReportermService.getSingleReporterm(this.$route.params.id);
			} catch (err) {
				this.err = err;
			}
		},
		methods: {
			async deleteReporterm() {
				try {
					await ReportermService.deleteReporterm(this.$route.params.id);
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
