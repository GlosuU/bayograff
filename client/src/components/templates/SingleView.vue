<template>
	<div id="single-view" class="centeraligned">
		<SecondaryButtons
			:backRoute="backRoute"
			:editRoute="editRoute"
			@delete-object="deleteBayobject"
		/>
		<br />
		<!-- Reporterm -->
		<h2 v-if="bayobject.startDate && bayobject.endDate">
			{{
				new Date(bayobject.startDate).toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
					day: "numeric",
				})
			}}
			-
			{{
				new Date(bayobject.endDate).toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
					day: "numeric",
				})
			}}
		</h2>
		<!-- Anecdaynote -->
		<h2 v-if="bayobject.date">
			{{
				new Date(bayobject.date).toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
					day: "numeric",
				})
			}}
		</h2>
		<h1>
			<u>{{ bayobject.title }}</u>
		</h1>
		<br />
		<p
			class="content-paragraph singleobjectcontentview automargin alignlistitems"
			v-html="bayobject.content"
		/>
		<img :src="getImage(bayobject.image)" alt="Image" class="externalImgBig" />
		<br />
		<br />
		<div class="object-dates">
			<h5>
				Created:
				{{
					new Date(bayobject.createdAt).toLocaleDateString(undefined, {
						year: "numeric",
						month: "long",
						day: "numeric",
					})
				}}
			</h5>
			<h5>
				Last updated:
				{{
					new Date(bayobject.updatedAt).toLocaleDateString(undefined, {
						year: "numeric",
						month: "long",
						day: "numeric",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})
				}}
			</h5>
		</div>
		<br />
		<SecondaryButtons
			:backRoute="backRoute"
			:editRoute="editRoute"
			@delete-object="deleteBayobject"
		/>
		<br />
	</div>
</template>

<script>
	import SecondaryButtons from "../buttons/SecondaryButtons";
	import ImagesService from "../../services/ImagesService";

	export default {
		name: "SingleView",
		components: {
			SecondaryButtons,
		},
		props: ["bayobject", "bayobjecttype", "backRoute", "editRoute"],
		methods: {
			getImage(img) {
				return ImagesService.getImage(img, this.bayobjecttype);
			},
			deleteBayobject() {
				this.$emit("delete-bayobject");
			},
		},
	};
</script>

<style>
	.object-dates {
		font-weight: bold;
		font-style: italic;
	}

	.externalImgBig {
		max-width: 600px;
		max-height: 400px;
	}
</style>
