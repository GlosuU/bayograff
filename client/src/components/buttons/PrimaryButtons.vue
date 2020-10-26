<template>
	<div id="primarybuttons" class="margin10 bayobtns">
		<b-button @click="go2NewReporterm" variant="dark">
			<b-icon icon="journal-plus" /> New Reporterm
		</b-button>
		<b-button @click="go2NewAnecdaynote" variant="dark">
			<b-icon icon="file-earmark-plus" /> New Anecdaynote
		</b-button>
		<b-button @click="go2NewFactale" variant="dark">
			<b-icon icon="patch-plus" /> New Factale
		</b-button>
		<div class="floatRight">
			<b-form v-if="enableSearch" @submit="searchText" inline>
				<b-form-input
					v-model="textToSearch"
					class="mr-sm-2"
					placeholder="Search by text"
					required
				/>
				<b-button class="my-2 my-sm-0" type="submit">
					<b-icon icon="search" /> Search
				</b-button>
			</b-form>
			<b-button v-if="enableSidebar" variant="primary" v-b-toggle="sidebar">
				Anecdaynotes in this Reporterm <b-icon icon="arrow-left" />
			</b-button>
		</div>
		<div class="clear" />
	</div>
</template>

<script>
	import ReportermService from "../../services/ReportermService";
	import AnecdaynoteService from "../../services/AnecdaynoteService";
	import FactaleService from "../../services/FactaleService";

	export default {
		props: ["enableSearch", "enableSidebar", "sidebar"],
		data() {
			return {
				textToSearch: "",
			};
		},
		methods: {
			searchText(evt) {
				evt.preventDefault();
				this.$emit("search-text", this.textToSearch);
			},
			showSidebar(evt) {
				evt.preventDefault();
				this.$emit("show-sidebar");
			},
			async go2NewReporterm() {
				await this.go2NewBayobject(
					this.$nReporterms,
					process.env.VUE_APP_MAX_N_REPORTERMS,
					"reporterm"
				);
			},
			async go2NewAnecdaynote() {
				await this.go2NewBayobject(
					this.$nAnecdaynotes,
					process.env.VUE_APP_MAX_N_ANECDAYNOTES,
					"anecdaynote"
				);
			},
			async go2NewFactale() {
				await this.go2NewBayobject(
					this.$nFactales,
					process.env.VUE_APP_MAX_N_FACTALES,
					"factale"
				);
			},
			capitalize: (s) => {
				if (typeof s !== "string") return "";
				return s.charAt(0).toUpperCase() + s.slice(1);
			},
			async go2NewBayobject(nObjects, maxNObjects, objectTypeStr) {
				if (nObjects < 0) {
					try {
						const accessToken = await this.$auth.getTokenSilently();
						switch (objectTypeStr) {
							case "reporterm":
								nObjects = await ReportermService.getReportermsTotalCount(
									accessToken
								);
								break;
							case "anecdaynote":
								nObjects = await AnecdaynoteService.getAnecdaynotesTotalCount(
									accessToken
								);
								break;
							case "factale":
								nObjects = await FactaleService.getFactalesTotalCount(accessToken);
								break;
						}
					} catch (err) {
						this.err = err;
						this.$root.$bvToast.toast(
							`We're sorry, something went wrong and we can't create new ${this.capitalize(
								objectTypeStr
							)}s. Maybe try again later.`,
							{
								title: "Error",
								toaster: "b-toaster-top-center",
								variant: "danger",
								autoHideDelay: 5000,
							}
						);
					}
				}
				if (nObjects < maxNObjects) {
					this.$router.push({ path: `/${objectTypeStr}s/new` });
				} else {
					this.$root.$bvToast.toast(
						`You cannot have more than ${maxNObjects} ${this.capitalize(
							objectTypeStr
						)}s. Please delete one before creating a new one.`,
						{
							title: `${this.capitalize(objectTypeStr)}s limit reached`,
							toaster: "b-toaster-top-center",
							variant: "danger",
							autoHideDelay: 5000,
						}
					);
				}
			},
		},
	};
</script>

<style></style>
