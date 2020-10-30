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
				:class="[
					(titleMissing && !title) || title.length > maxTitleLength
						? 'showRequired'
						: 'hideRequired',
				]"
			>
				<b-form-input id="title-input" class="margin5" v-model="title" />
			</b-form-group>
			<div class="numcharsmessage" v-if="titleInputMessage">
				{{ titleInputMessage }}
			</div>
			<br />
			<!-- </b-form> -->
			<p>The standard format is a ready to print PDF document:</p>
			<div class="centeraligned">
				<a id="exportToPDF" @click="export2pdf" target="_blank">
					<img :src="getImage('export2pdf')" class="buttonImg" />
					Export biography to PDF
				</a>
			</div>
			<hr />
			<h2>Other formats:</h2>
			<ul id="formats">
				<li>
					<b-button class="btn100width" @click="export2tex" target="_blank">
						LaTeX
					</b-button>
					- If you prefer the uncompiled .tex file that generates the above PDF.
				</li>
				<li>
					<b-button class="btn100width" @click="export2txt" target="_blank">
						Plain Text
					</b-button>
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
				titleMissing: false,
				maxTitleLength: 150,
				err: "",
			};
		},
		methods: {
			getImage: (img) => ImagesService.getImage(img),
			validateTitle() {
				let validated = true;

				// Non-empty validation
				if (!this.title) {
					this.titleMissing = true;
					this.$root.$bvToast.toast(`Please fill out the title`, {
						title: "Missing title",
						toaster: "b-toaster-top-center",
						variant: "danger",
						autoHideDelay: 4000,
					});
					validated = false;
				}

				// Within Limits validation
				if (this.title.length > this.maxTitleLength) {
					this.$root.$bvToast.toast(
						`Please reduce the amount of characters in the title`,
						{
							title: "Character limit exceeded",
							toaster: "b-toaster-top-center",
							variant: "danger",
							autoHideDelay: 4000,
						}
					);
					validated = false;
				}

				// Allow export if validated
				if (validated) {
					return true;
				} else {
					return false;
				}
			},
			async export2pdf() {
				if (this.validateTitle()) {
					try {
						const accessToken = await this.$auth.getTokenSilently();

						await ExporterService.export2pdf(this.title, accessToken);
					} catch (err) {
						this.err = err;
					}
				}
			},
			async export2tex() {
				if (this.validateTitle()) {
					try {
						const accessToken = await this.$auth.getTokenSilently();

						await ExporterService.export2tex(this.title, accessToken);
					} catch (err) {
						this.err = err;
					}
				}
			},
			async export2txt() {
				if (this.validateTitle()) {
					try {
						const accessToken = await this.$auth.getTokenSilently();

						await ExporterService.export2txt(this.title, accessToken);
					} catch (err) {
						this.err = err;
					}
				}
			},
		},
		computed: {
			titleInputMessage() {
				const numChars = this.title.length;
				if (numChars > this.maxTitleLength - 20 && numChars <= this.maxTitleLength) {
					return `Reaching the limit: ${numChars}/${this.maxTitleLength} characters`;
				} else if (numChars > this.maxTitleLength) {
					return `Limit exceeded! ${numChars}/${this.maxTitleLength} characters`;
				} else {
					return "";
				}
			},
		},
	};
</script>

<style>
	#exportToPDF {
		color: darkblue;
		font-weight: bold;
		cursor: pointer;
	}

	#exportToPDF:hover {
		text-decoration: underline;
	}

	.btn100width {
		width: 100px;
	}
</style>
