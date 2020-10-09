<template>
	<div id="bayo-form">
		<h2>{{ statusMsg }}</h2>
		<br />
		<b-form @submit="onSave" @reset="onReset" v-if="show">
			<b-form-group id="input-group-1" label="Date Range:" label-for="input-1">
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

			<b-form-group id="input-group-2" label="Title:" label-for="input-2">
				<b-form-input
					id="input-2"
					v-model="object.title"
					required
					placeholder="Enter title"
				></b-form-input>
			</b-form-group>

			<b-form-group id="input-group-3" label="Content:" label-for="input-3">
				<b-form-textarea
					id="input-3"
					v-model="object.content"
					required
					placeholder="Enter content"
					rows="8"
					max-rows="8"
					no-resize
				></b-form-textarea>
			</b-form-group>

			<b-button type="submit" variant="success"><b-icon icon="upload" /> Save</b-button>
			<b-button :to="fromRoute" variant="danger"><b-icon icon="x-circle" /> Cancel</b-button>
			<!-- <b-button type="reset" variant="primary">Reset</b-button> -->
		</b-form>
	</div>
</template>

<script>
	export default {
		name: "BayoForm",
		props: ["statusMsg", "object", "fromRoute"],
		data() {
			return {
				show: true,
			};
		},
		methods: {
			onSave(evt) {
				evt.preventDefault();
				this.$emit("save-object", this.object);
			},
			// onReset(evt) {
			// 	evt.preventDefault();
			// 	// Reset form values
			// 	this.object.title = "";
			// 	this.object.content = "";
			// 	this.object.startDate = new Date(2018, 0, 16);
			// 	this.object.endDate = new Date();
			// 	// Trick to reset/clear native browser form validation state
			// 	this.show = false;
			// 	this.$nextTick(() => {
			// 		this.show = true;
			// 	});
			// },
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
</style>
