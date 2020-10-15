<template>
	<div id="bayocard" class="maxcardsize">
		<b-card no-body class="overflow-hidden maxcardsize">
			<b-row no-gutters>
				<b-col md="3">
					<b-card-img-lazy
						:src="getImage(bayobject.image)"
						alt="Image"
						class="rounded-0 maximgheight"
					></b-card-img-lazy>
				</b-col>
				<b-col md="2">
					<b-card-body class="biggerfont">
						<div class="d-lg-none">
							<b-card-text class="centeraligned">
								{{
									bayobject.startDate.toLocaleDateString(undefined, {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								}}
								<span class="tabspaces">-</span>
								{{
									bayobject.endDate.toLocaleDateString(undefined, {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								}}
							</b-card-text>
						</div>
						<div class="d-none d-lg-block">
							<b-card-text class="centeraligned">
								{{
									bayobject.startDate.toLocaleDateString(undefined, {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								}}
								<br />-<br />
								{{
									bayobject.endDate.toLocaleDateString(undefined, {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								}}
							</b-card-text>
						</div>
					</b-card-body>
				</b-col>
				<b-col md="6">
					<b-card-body :title="bayobject.title" :sub-title="getSubtitleStr(bayobject)">
						<b-card-text>{{
							truncate(bayobject.content.replace("\n", "\\"), maxLength)
						}}</b-card-text>
					</b-card-body>
				</b-col>
				<b-col md="1">
					<b-card-body id="card-edit-delete-btns" class="centeraligned btn-margin">
						<b-button @click="editObject" variant="success">
							<b-icon icon="pencil-square" />
						</b-button>
						<b-button @click="deleteObject" variant="danger">
							<b-icon icon="trash" />
						</b-button>
					</b-card-body>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
	import ImagesService from "../services/ImagesService";

	export default {
		props: ["bayobject", "editRoute"],
		data() {
			return {
				maxLength: 300,
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
			getSubtitleStr: (bayobject) => {
				return `Created: ${bayobject.createdAt.toLocaleDateString(undefined, {
					year: "numeric",
					month: "short",
					day: "numeric",
				})} | Last update: ${bayobject.updatedAt.toLocaleDateString(undefined, {
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				})}`;
			},
			getImage: (img) => ImagesService.getImage(img),
			editObject(evt) {
				evt.preventDefault();
				this.$emit("edit-object", this.bayobject);
			},
			deleteObject(evt) {
				evt.preventDefault();
				this.$emit("delete-object", this.bayobject);
			},
		},
	};
</script>

<style>
	.maxcardwidth {
		max-width: 1400px;
	}

	.maximgheight {
		object-fit: cover;
		height: 200px;
	}

	.tabspaces {
		padding: 0px 10px;
	}

	.btn-margin button {
		margin: 8px;
	}
</style>
