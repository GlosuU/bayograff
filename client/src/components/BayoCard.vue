<template>
	<div id="bayocard" class="maxcardsize">
		<b-card no-body class="overflow-hidden maxcardsize">
			<b-row no-gutters>
				<b-col md="3">
					<b-card-img-lazy
						:src="getImage(bayobject.image)"
						alt="Image"
						class="rounded-0"
					></b-card-img-lazy>
				</b-col>
				<b-col md="2">
					<b-card-body>
						<b-card-text id="card-dates-text">
							<p>
								{{
									bayobject.startDate.toLocaleDateString(undefined, {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								}}
							</p>
							<p>-</p>
							<p>
								{{
									bayobject.endDate.toLocaleDateString(undefined, {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								}}
							</p>
						</b-card-text>
					</b-card-body>
				</b-col>
				<b-col md="7">
					<b-card-body :title="bayobject.title" :sub-title="getSubtitleStr(bayobject)">
						<b-card-text>{{
							truncate(bayobject.content.replace("\n", "\\"), maxLength)
						}}</b-card-text>
					</b-card-body>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
	import ImagesService from "../services/ImagesService";

	export default {
		props: ["bayobject"],
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
		},
	};
</script>

<style>
	.maxcardsize {
		max-width: 1400px;
		/* max-height: 300px; */
	}

	#card-dates-text {
		text-align: center;
	}
</style>
