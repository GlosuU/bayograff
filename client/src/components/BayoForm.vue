<template>
	<div id="bayo-form">
		<h2>{{ statusMsg }}</h2>
		<br />
		<b-form @submit="onSave">
			<b-form-group id="dates-input-group" label="Date Range:" label-for="input-1">
				<b-input-group id="input-1">
					<b-datepicker
						id="startDate"
						v-model="object.startDate"
						class="mb-2"
						required
						:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit' }"
						:max="object.endDate"
						value-as-date
						show-decade-nav
						close-button
						locale="en"
					></b-datepicker>
					<b-datepicker
						id="endDate"
						v-model="object.endDate"
						class="mb-2"
						required
						:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit' }"
						:min="object.startDate"
						value-as-date
						show-decade-nav
						today-button
						close-button
						locale="en"
					></b-datepicker>
				</b-input-group>
			</b-form-group>

			<b-form-group id="title-input-group" label="Title:" label-for="input-2">
				<b-form-input
					id="input-2"
					v-model="object.title"
					required
					placeholder="Enter title"
				/>
			</b-form-group>

			<b-form-group id="content-input-group" label="Content:" label-for="input-3">
				<b-form-textarea
					id="input-3"
					v-model="object.content"
					required
					placeholder="Enter content"
					rows="8"
					max-rows="8"
					no-resize
				/>
			</b-form-group>

			<b-button v-b-toggle.imgOptionsCollapse variant="primary">
				{{ imgOptionsVisible ? "Hide" : "Show" }} image options
				<b-icon v-if="!imgOptionsVisible" icon="arrow-right" />
				<b-icon v-if="imgOptionsVisible" icon="arrow-down" />
			</b-button>
			<br />
			<b-collapse id="imgOptionsCollapse" v-model="imgOptionsVisible">
				<br />
				<em>
					<strong>NOTE:</strong> Images are for reference in the website. They will not
					appear when exporting the whole biography.
				</em>
				<br />
				<!-- <b-form-radio-group id="image-location-radio-group" v-model="useExternalImg">
					<b-form-radio :value="false">
						Use a preset image: -->
				<div class="bayoformRadioOptions">
					<b-form-radio-group id="local-image-radio-group" v-model="object.image">
						<b-form-radio value="noImg" :disabled="useExternalImg">
							<b-img-lazy :src="this.images.noImg" alt="Default image" height="125" />
						</b-form-radio>
						<b-form-radio value="beach" :disabled="useExternalImg">
							<b-img-lazy :src="this.images.beach" alt="Default image" height="125" />
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
							<b-img-lazy :src="this.images.heart" alt="Default image" height="125" />
						</b-form-radio>
						<b-form-radio value="ball" :disabled="useExternalImg">
							<b-img-lazy :src="this.images.ball" alt="Default image" height="125" />
						</b-form-radio>
					</b-form-radio-group>
				</div>
				<!-- </b-form-radio>
					<b-form-radio :value="true">
						Use an external image:
						<div class="bayoformRadioOptions">
							<b-form-input
								id="hello"
								placeholder="Image URL"
								v-model="object.image"
								:disabled="!useExternalImg"
							/>
						</div>
					</b-form-radio>
				</b-form-radio-group> -->
			</b-collapse>

			<br />
			<b-button type="submit" variant="success"><b-icon icon="upload" /> Save</b-button>
			<b-button :to="fromRoute" variant="danger"><b-icon icon="x-circle" /> Cancel</b-button>
		</b-form>
	</div>
</template>

<script>
	import ImagesService from "../services/ImagesService";

	export default {
		name: "BayoForm",
		props: ["statusMsg", "object", "fromRoute"],
		data() {
			return {
				// show: true,
				imgOptionsVisible: false,
				useExternalImg: false,
				images: ImagesService.getAllImages(),
			};
		},
		methods: {
			onSave(evt) {
				evt.preventDefault();
				this.$emit("save-object", this.object);
			},
		},
	};
</script>

<style>
	#bayo-form {
		margin: 10px;
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
</style>
