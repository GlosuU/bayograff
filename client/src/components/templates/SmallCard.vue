<template>
	<div id="smallcard" :class="['cardlink', 'anecdaynotecard', 'centeraligned']">
		<router-link :to="`/anecdaynotes/${anecdaynote._id}`">
			<b-card class="mb-2">
				<b-card-img-lazy
					:src="getImage(anecdaynote.image)"
					alt="Anecdaynote Image"
					class="rounded-0 maximgheight"
				/>
				<b-card-title>
					{{ truncate(anecdaynote.title, maxLength) }}
				</b-card-title>
				<b-card-text>
					{{
						new Date(anecdaynote.date).toLocaleDateString(undefined, {
							year: "numeric",
							month: "long",
							day: "numeric",
						})
					}}
				</b-card-text>
			</b-card>
		</router-link>
	</div>
</template>

<script>
	import ImagesService from "../../services/ImagesService";

	export default {
		props: ["anecdaynote"],
		data() {
			return {
				maxLength: 50,
			};
		},
		methods: {
			truncate: (str, len) => {
				if (str.length > len && str.length > 0) {
					let new_str = str + " ";
					new_str = str.substr(0, len);
					new_str = str.substr(0, new_str.lastIndexOf(" "));
					new_str = new_str.length > 0 ? new_str : str.substr(0, len);
					return new_str + "...";
				}
				return str;
			},
			getImage: (img) => ImagesService.getImage(img),
			// editObject(evt) {
			// 	evt.preventDefault();
			// 	this.$emit("edit-object", this.bayobject);
			// },
			// deleteObject(evt) {
			// 	evt.preventDefault();
			// 	this.$emit("delete-object", this.bayobject);
			// },
		},
	};
</script>

<style />
