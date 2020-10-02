<template>
	<div id="export">
		<h1>Export Biography</h1>
		<p>Click on a button below to download the biography in the desired format.</p>
		<p>If the biography is of another person, please enter their name here first:</p>
		<b-form inline>
			<b-form-group id="name-input-group" label="Name:" label-for="name-input">
				<b-form-input id="name-input" v-model="name" required></b-form-input>
			</b-form-group>
		</b-form>
		<br />
		<h2>Formats</h2>
		<ul id="formats">
			<li>
				<b-button @click="export2pdf" target="_blank">PDF</b-button>
				- Recommended format. Biography ready to print.
			</li>
			<li>
				<b-button @click="export2tex" target="_blank">LaTeX</b-button>
				- If you prefer the uncompiled .tex file.
			</li>
			<li>
				<b-button @click="export2txt" target="_blank">Plain Text</b-button>
				- Get all the data in a simple .txt file.
			</li>
		</ul>
	</div>
</template>

<script>
	import ExporterService from "../ExporterService";
	export default {
		data() {
			return {
				name: "The author",
				err: "",
			};
		},
		methods: {
			async export2pdf() {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					await ExporterService.export2pdf(accessToken);
				} catch (err) {
					this.err = err;
				}
			},
			async export2tex() {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					await ExporterService.export2tex(accessToken);
				} catch (err) {
					this.err = err;
				}
			},
			async export2txt() {
				try {
					const accessToken = await this.$auth.getTokenSilently();

					await ExporterService.export2txt(accessToken);
				} catch (err) {
					this.err = err;
				}
			},
		},
	};
</script>

<style>
	#export {
		padding: 10px;
	}
	#name-input {
		padding-left: 10px;
	}
	#formats li {
		padding-bottom: 10px;
	}
</style>
