<template>
	<div id="secondarybuttons" class="centeraligned bayobtns">
		<b-button :to="backRoute" variant="primary">
			<b-icon icon="skip-backward" /> Back to all
		</b-button>
		<b-button :to="editRoute" variant="success">
			<b-icon icon="pencil-square" /> Edit
		</b-button>
		<b-button @click="deleteObject" variant="danger"> <b-icon icon="trash" /> Delete </b-button>
	</div>
</template>

<script>
	export default {
		props: ["backRoute", "editRoute"],
		methods: {
			deleteObject(evt) {
				evt.preventDefault();
				this.$emit("delete-object");
			},
		},
	};
</script>

<style></style>
