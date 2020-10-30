<template>
	<div id="export" class="routercontent margin10 content-paragraph bayobtns">
		<h1 class="centeraligned">Export Biography</h1>
		<p class="centeraligned">
			Biography ready? Or want to export what you have as a backup? You're in the right place.
		</p>
		<div class="fullpagetextview automargin alignlistitems">
			<!-- <b-form inline> -->
			<b-form-group
				id="title-input-group"
				label="Enter the title of the biography document:"
				label-for="title-input"
			>
				<b-form-input id="title-input" class="margin5" v-model="title" />
			</b-form-group>
			<!-- </b-form> -->
			<p>The standard format is a ready to print PDF document:</p>
			<div class="centeraligned">
				<a href="" @click="export2pdf" target="_blank">
					<img :src="getImage('export2pdf')" class="buttonImg" />
					Export to PDF
				</a>
			</div>
			<hr />
			<h2>Other formats:</h2>
			<ul id="formats">
				<li>
					<b-button @click="export2tex" target="_blank">LaTeX</b-button>
					- If you prefer the uncompiled .tex file that generates the above PDF.
				</li>
				<li>
					<b-button @click="export2txt" target="_blank">Plain Text</b-button>
					- Get all data in a simple .txt file. Anecdaynotes are included separate from
					Reporterms.
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import ExporterService from "../services/ExporterService";
	import ImagesService from "../services/ImagesService";

	export default {
		data() {
			return {
				title: `The biography of ${this.$auth.user.name}`,
				err: "",
			};
		},
		methods: {
			getImage: (img) => ImagesService.getImage(img),
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

<style></style>
