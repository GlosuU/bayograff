<template>
	<div id="image-selection">
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
	</div>
</template>

<script>
	import ImagesService from "../../services/ImagesService";

	export default {
		data() {
			return {
				useExternalImg: false,
				localImg: "",
				externalImgURL: "",
				images: ImagesService.getAllImages(),
			};
		},
	};
</script>

<style></style>
