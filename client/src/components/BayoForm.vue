<template>
	<div id="bayo-form">
		<h2>{{ statusMsg }}</h2>
		<b-form-group
			id="dates-input-group"
			label="Date Range:"
			label-for="input-1"
			class="hideRequired"
		>
			<b-input-group id="input-1">
				<b-datepicker
					id="startDate"
					v-model="object.startDate"
					class="mb-2"
					:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit' }"
					:max="object.endDate"
					value-as-date
					show-decade-nav
					close-button
					locale="en"
				/>
				<b-datepicker
					id="endDate"
					v-model="object.endDate"
					class="mb-2"
					:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit' }"
					:min="object.startDate"
					value-as-date
					show-decade-nav
					today-button
					close-button
					locale="en"
				/>
			</b-input-group>
		</b-form-group>

		<b-form-group
			id="title-input-group"
			label="Title:"
			label-for="input-2"
			:class="[titleMissing && !object.title ? 'showRequired' : 'hideRequired']"
		>
			<b-form-input id="input-2" v-model="object.title" placeholder="Enter title" />
		</b-form-group>

		<!-- <b-form-group
			id="content-input-group"
			label="Content:"
			label-for="input-3"
			:class="[contentMissing && !object.content ? 'showRequired' : 'hideRequired']"
		>
			<b-form-textarea
				id="input-3"
				v-model="object.content"
				placeholder="Enter content"
				rows="8"
				max-rows="8"
				no-resize
			/>
		</b-form-group> -->

		<div :class="[contentMissing && !object.content ? 'showRequired' : 'hideRequired']">
			<div class="label">Content:</div>
			<TextEditor :initialContent="object.content" @editor-blurred="updateContent" />
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
							<b-form-radio value="ball" :disabled="useExternalImg">
								<b-img-lazy
									:src="this.images.ball"
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
		<b-button :to="fromRoute" variant="danger"><b-icon icon="x-circle" /> Cancel</b-button>
	</div>
</template>

<script>
	import ImagesService from "../services/ImagesService";
	import TextEditor from "./TextEditor";

	export default {
		name: "BayoForm",
		props: ["statusMsg", "object", "fromRoute"],
		components: {
			TextEditor,
		},
		data() {
			return {
				imgOptionsVisible: false,
				useExternalImg: false,
				localImg: "",
				externalImgURL: "",
				images: ImagesService.getAllImages(),
				titleMissing: false,
				contentMissing: false,
			};
		},
		created() {
			if (ImagesService.isLocal(this.object.image)) {
				this.localImg = this.object.image;
			} else {
				this.useExternalImg = true;
				this.externalImgURL = this.object.image;
			}
		},
		methods: {
			updateContent(content) {
				if (content == `<p></p>`) {
					this.object.content = "";
				} else {
					this.object.content = content;
				}
			},
			onSave() {
				if (!this.object.title) {
					this.titleMissing = true;
				}

				if (!this.object.content) {
					this.contentMissing = true;
				}

				if (this.object.title && this.object.content) {
					this.saveImg();
					this.$emit("save-object", this.object);
				} else {
					this.$root.$bvToast.toast(`Please fill out required fields`, {
						title: "Missing required fields",
						toaster: "b-toaster-top-center",
						variant: "danger",
						autoHideDelay: 4000,
					});
				}
			},
			saveImg() {
				if (this.useExternalImg) {
					if (this.externalImgURL) {
						this.object.image = this.externalImgURL;
					} else {
						this.object.image = "noImg";
					}
				} else {
					this.object.image = this.localImg;
				}
			},
		},
	};
</script>

<style>
	#bayo-form {
		margin: 5px;
	}

	#bayo-form a {
		margin-right: 10px;
	}

	#bayo-form button {
		margin-right: 10px;
	}

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
</style>
