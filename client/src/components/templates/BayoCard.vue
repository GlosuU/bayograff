<template>
	<div id="bayocard" :class="['cardlink', objectClass]">
		<router-link :to="objectViewURL">
			<b-card no-body class="overflow-hidden">
				<b-row no-gutters>
					<b-col md="3">
						<b-card-img-lazy
							:src="getImage(bayobject.image)"
							alt="Image"
							class="rounded-0 maximgheight"
						/>
					</b-col>
					<b-col
						md="2"
						v-if="(bayobject.startDate && bayobject.endDate) || bayobject.date"
					>
						<!-- Reporterm -->
						<b-card-body
							class="biggerfont"
							v-if="bayobject.startDate && bayobject.endDate"
						>
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
						<!-- Anecdaynote -->
						<b-card-body class="biggerfont" v-if="bayobject.date">
							<b-card-text class="centeraligned">
								{{
									bayobject.date.toLocaleDateString(undefined, {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								}}
							</b-card-text>
						</b-card-body>
					</b-col>
					<!-- Factales have more columns because of lack of date -->
					<b-col
						:md="(bayobject.startDate && bayobject.endDate) || bayobject.date ? 6 : 8"
					>
						<b-card-body
							:title="bayobject.title"
							:sub-title="getSubtitleStr(bayobject)"
						>
							<b-card-text>{{
								truncate(stripContentOfHTML(bayobject.content), maxLength)
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
		</router-link>
	</div>
</template>

<script>
	import ImagesService from "../../services/ImagesService";
	import ProcessHTMLService from "../../services/ProcessHTMLService";

	export default {
		props: ["bayobject", "objectClass", "objectViewURL"],
		data() {
			return {
				maxLength: 250,
			};
		},
		methods: {
			stripContentOfHTML(content) {
				return ProcessHTMLService.getCardContent(content);
			},
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

<style src="../../stylesheets/card.css" />
