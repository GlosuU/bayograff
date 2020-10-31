<template>
	<div id="bayo-form" class="margin5 bayobtns">
		<h2>{{ statusMsg }}</h2>

		<b-form-group
			label="Date Range:"
			label-for="input-1-twodates"
			class="hideRequired"
			v-if="bayobject.startDate && bayobject.endDate"
		>
			<b-input-group id="input-1-twodates">
				<b-datepicker
					id="startDate"
					v-model="bayobject.startDate"
					class="mb-2"
					:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit' }"
					:max="bayobject.endDate"
					value-as-date
					show-decade-nav
					close-button
					locale="en"
				/>
				<b-datepicker
					id="endDate"
					v-model="bayobject.endDate"
					class="mb-2"
					:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit' }"
					:min="bayobject.startDate"
					value-as-date
					show-decade-nav
					today-button
					close-button
					locale="en"
				/>
			</b-input-group>
		</b-form-group>

		<b-form-group
			label="Date:"
			label-for="input-1-onedate"
			class="hideRequired"
			v-if="bayobject.date"
		>
			<b-input-group id="input-1-onedate">
				<b-datepicker
					id="date"
					v-model="bayobject.date"
					class="mb-2"
					:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit' }"
					value-as-date
					show-decade-nav
					close-button
					locale="en"
				/>
			</b-input-group>
		</b-form-group>

		<b-form-group
			id="title-input-group"
			label="Title:"
			label-for="input-2"
			:class="[
				(titleMissing && !bayobject.title) || bayobject.title.length > maxTitleLength
					? 'showRequired'
					: 'hideRequired',
			]"
		>
			<b-form-input id="input-2" v-model="bayobject.title" placeholder="Enter title" />
		</b-form-group>

		<div class="numcharsmessage" v-if="titleInputMessage">
			{{ titleInputMessage }}
		</div>

		<div
			:class="[
				(contentMissing && !bayobject.content) || cleanContent.length > maxContentLength
					? 'showRequired'
					: 'hideRequired',
			]"
		>
			<div class="label">Content:</div>
			<TextEditor :initialContent="bayobject.content" @editor-updated="updateContent" />
		</div>

		<div class="numcharsmessage" v-if="contentInputMessage">
			{{ contentInputMessage }}
		</div>

		<br />

		<b-button v-b-toggle.imgOptionsCollapse variant="primary">
			{{ imgOptionsVisible ? "Hide" : "Show" }} image options
			<b-icon v-if="!imgOptionsVisible" icon="arrow-right" />
			<b-icon v-if="imgOptionsVisible" icon="arrow-down" />
		</b-button>
		<br />
		<b-collapse id="imgOptionsCollapse" v-model="imgOptionsVisible">
			<br />
			<em>
				<strong>NOTE:</strong> Images are only for reference in the website. They will not
				appear when exporting the whole biography.
			</em>
			<br />
			<b-form-radio-group id="image-location-radio-group" v-model="useExternalImg">
				<b-form-radio :value="false">
					Use a preset image:
					<div class="bayoformRadioOptions">
						<b-form-radio-group id="local-image-radio-group" v-model="localImg">
							<b-form-radio value="noImg" :disabled="useExternalImg">
								<b-img-lazy
									:src="this.images.noImg"
									alt="Default image"
									height="125"
								/>
							</b-form-radio>
							<b-form-radio value="beach" :disabled="useExternalImg">
								<b-img-lazy
									:src="this.images.beach"
									alt="Default image"
									height="125"
								/>
							</b-form-radio>
							<b-form-radio value="mountain" :disabled="useExternalImg">
								<b-img-lazy
									:src="this.images.mountain"
									alt="Default image"
									height="125"
								/>
							</b-form-radio>
							<b-form-radio value="graduation" :disabled="useExternalImg">
								<b-img-lazy
									:src="this.images.graduation"
									alt="Default image"
									height="125"
								/>
							</b-form-radio>
							<b-form-radio value="heart" :disabled="useExternalImg">
								<b-img-lazy
									:src="this.images.heart"
									alt="Default image"
									height="125"
								/>
							</b-form-radio>
							<b-form-radio value="logo" :disabled="useExternalImg">
								<b-img-lazy
									:src="this.images.logo"
									alt="Default image"
									height="125"
								/>
							</b-form-radio>
						</b-form-radio-group>
					</div>
				</b-form-radio>
				<br />
				<b-form-radio :value="true"> Use an external image: </b-form-radio>
			</b-form-radio-group>
			<div class="bayoformRadioOptions">
				<b-form-input
					id="externalImageInput"
					placeholder="Image URL"
					v-model="externalImgURL"
					:disabled="!useExternalImg"
					lazy
				/>
				<b-img-lazy
					v-if="useExternalImg && externalImgURL"
					:src="externalImgURL"
					alt="Image URL not valid"
					class="externalImgSmall"
				/>
			</div>
		</b-collapse>
		<br />
		<b-button @click="onSave" variant="success"><b-icon icon="upload" /> Save</b-button>
		<b-button @click="goBack" variant="danger"><b-icon icon="x-circle" /> Cancel</b-button>
	</div>
</template>

<script>
	import ImagesService from "../../services/ImagesService";
	import ProcessHTMLService from "../../services/ProcessHTMLService";
	import TextEditor from "./TextEditor";

	export default {
		name: "BayoForm",
		props: ["statusMsg", "bayobject"],
		components: {
			TextEditor,
		},
		data() {
			return {
				from: null,
				imgOptionsVisible: false,
				useExternalImg: false,
				localImg: "",
				externalImgURL: "",
				images: ImagesService.getAllImages(),
				titleMissing: false,
				contentMissing: false,
				maxTitleLength: 150,
				maxContentLength: 8000,
			};
		},
		created() {
			if (ImagesService.isLocal(this.bayobject.image)) {
				this.localImg = this.bayobject.image;
			} else {
				this.useExternalImg = true;
				this.externalImgURL = this.bayobject.image;
			}
		},
		methods: {
			updateContent(content) {
				if (content == `<p></p>`) {
					this.bayobject.content = "";
				} else {
					this.bayobject.content = content;
				}
			},
			onSave() {
				let validated = true;

				// Non-empty validation
				if (!this.bayobject.title) {
					this.titleMissing = true;
				}

				if (!this.bayobject.content) {
					this.contentMissing = true;
				}

				if (!this.bayobject.title || !this.bayobject.content) {
					this.$root.$bvToast.toast(`Please fill out required fields`, {
						title: "Missing required fields",
						toaster: "b-toaster-top-center",
						variant: "danger",
						autoHideDelay: 4000,
					});
					validated = false;
				}

				// Within Limits validation
				if (
					this.bayobject.title.length > this.maxTitleLength ||
					this.cleanContent.length > this.maxContentLength
				) {
					this.$root.$bvToast.toast(`Please reduce the amount of characters`, {
						title: "Character limit exceeded",
						toaster: "b-toaster-top-center",
						variant: "danger",
						autoHideDelay: 4000,
					});
					validated = false;
				}

				// Save bayobject if validated
				if (validated) {
					this.saveImg();
					this.$emit("save-bayobject", this.fixDates(this.bayobject));
				}
			},
			// Necessary to set the hour to 2 a.m. or new Date() will take the day before sometimes!!
			fixDates(bayobject) {
				let fixedBObj = { ...bayobject };
				if (fixedBObj.startDate) {
					fixedBObj.startDate = new Date(new Date(fixedBObj.startDate).setHours(2));
				}
				if (fixedBObj.endDate) {
					fixedBObj.endDate = new Date(new Date(fixedBObj.endDate).setHours(2));
				}
				if (fixedBObj.date) {
					fixedBObj.date = new Date(new Date(fixedBObj.date).setHours(2));
				}
				return fixedBObj;
			},
			saveImg() {
				if (this.useExternalImg) {
					if (this.externalImgURL) {
						this.bayobject.image = this.externalImgURL;
					} else {
						this.bayobject.image = "noImg";
					}
				} else {
					this.bayobject.image = this.localImg;
				}
			},
			goBack() {
				this.$router.back();
			},
		},
		computed: {
			titleInputMessage() {
				const numChars = this.bayobject.title.length;
				if (numChars > this.maxTitleLength - 20 && numChars <= this.maxTitleLength) {
					return `Reaching the limit: ${numChars}/${this.maxTitleLength} characters`;
				} else if (numChars > this.maxTitleLength) {
					return `Limit exceeded! ${numChars}/${this.maxTitleLength} characters`;
				} else {
					return "";
				}
			},
			cleanContent() {
				return ProcessHTMLService.getTextContent(this.bayobject.content);
			},
			contentInputMessage() {
				const cleanContent = this.cleanContent;
				const numChars = cleanContent.length;
				if (numChars > this.maxContentLength - 500 && numChars <= this.maxContentLength) {
					return `Reaching the limit: ${numChars}/${this.maxContentLength} characters`;
				} else if (numChars > this.maxContentLength) {
					return `Limit exceeded! ${numChars}/${this.maxContentLength} characters`;
				} else {
					return "";
				}
			},
		},
	};
</script>

<style>
	.bayoformRadioOptions {
		margin: 10px 0px 10px 50px;
	}

	.externalImgSmall {
		max-width: 300px;
		max-height: 200px;
	}

	.hideRequired {
		border: 5px solid transparent;
		padding: 5px;
	}

	.showRequired {
		border: 5px solid red;
		color: red;
		padding: 5px;
	}

	.label {
		margin-bottom: 10px;
	}

	.numcharsmessage {
		color: red;
		font-weight: bold;
		margin: 0px 5px 5px 5px;
	}
</style>
