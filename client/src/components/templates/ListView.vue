<template>
	<div id="list-view" class="automargin maxcardwidth">
		<div class="centeraligned" v-if="bayobjects.length == 0 && !textToSearch">
			<h4>
				You have not created any {{ bayobjectType }}s yet. Click "New {{ bayobjectType }}"
				to create one.
			</h4>
		</div>
		<div class="centeraligned" v-if="textToSearch">
			<h4 v-if="bayobjects.length == 0">Sorry, no results found for "{{ textToSearch }}"</h4>
			<h4 v-if="bayobjects.length > 0">Showing results for "{{ textToSearch }}"</h4>
		</div>
		<div v-if="bayobjects.length > 0">
			<div id="lastupdatedobjcollapse" v-if="bayobjects.length > 1">
				<b-button
					id="toggleLastUpdCollapse"
					v-b-toggle.lastUpdatedBayobject
					variant="primary"
				>
					{{ lastUpdatedBayobjectVisible ? "Hide" : "Show" }} your last updated
					{{ bayobjectType }}
					<b-icon v-if="!lastUpdatedBayobjectVisible" icon="arrow-right" />
					<b-icon v-if="lastUpdatedBayobjectVisible" icon="arrow-down" />
				</b-button>
				<br /><br />
				<b-collapse id="lastUpdatedBayobject" v-model="lastUpdatedBayobjectVisible">
					<BayoCard
						:bayobject="lastUpdatedBayobject"
						:bayobjecttype="bayobjectType.toLowerCase()"
						:objectClass="bayobjectClass"
						:objectViewURL="`${rootPath}${lastUpdatedBayobject._id}`"
						@edit-object="editBayobject"
						@delete-object="deleteBayobject"
					/>
				</b-collapse>
				<hr />
				<SortButtons
					:sortDateEnabled="
						bayobjectType == 'Reporterm' || bayobjectType == 'Anecdaynote'
					"
					@sort-date-asc="sortDateASC"
					@sort-date-desc="sortDateDESC"
					@sort-alpha-az="sortAlphaAZ"
					@sort-alpha-za="sortAlphaZA"
					@sort-updated-at-asc="sortUpdatedAtASC"
					@sort-updated-at-desc="sortUpdatedAtDESC"
				/>
			</div>
			<br />
			<div id="bayobjectslistitem" v-for="b in repsPag" :key="b._id">
				<BayoCard
					:bayobject="b"
					:bayobjecttype="bayobjectType.toLowerCase()"
					:objectClass="bayobjectClass"
					:objectViewURL="`${rootPath}${b._id}`"
					@edit-object="editBayobject"
					@delete-object="deleteBayobject"
				/>
			</div>
			<br />
			<b-pagination
				v-model="currentPage"
				:total-rows="bayobjects.length"
				:per-page="perPage"
				aria-controls="bayobjectslist"
				align="center"
			>
			</b-pagination>
		</div>
		<br />
	</div>
</template>

<script>
	import SortButtons from "../../components/buttons/SortButtons";
	import BayoCard from "../../components/templates/BayoCard";

	export default {
		name: "ListView",
		components: {
			SortButtons,
			BayoCard,
		},
		props: ["textToSearch", "bayobjects", "bayobjectType", "bayobjectClass", "rootPath"],
		data() {
			return {
				lastUpdatedBayobject: {},
				lastUpdatedBayobjectVisible: false,
				currentPage: 1,
				perPage: 3,
			};
		},
		created() {
			if (this.bayobjects.length > 1) {
				this.lastUpdatedBayobject = this.bayobjects.reduce((a, b) =>
					new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b
				);
			}

			this.setPerPage();
		},
		mounted() {
			window.addEventListener("resize", this.setPerPage);
		},
		computed: {
			repsPag() {
				if (this.bayobjects.length > this.perPage) {
					return this.bayobjects.slice(
						(this.currentPage - 1) * this.perPage,
						this.currentPage * this.perPage
					);
				} else {
					return this.bayobjects;
				}
			},
		},
		methods: {
			setPerPage() {
				if (window.innerWidth > 768) {
					this.perPage = 5;
				} else {
					this.perPage = 3;
				}
			},
			sortDateASC() {
				this.$emit("sort-date-asc");
			},
			sortDateDESC() {
				this.$emit("sort-date-desc");
			},
			sortAlphaAZ() {
				this.bayobjects.sort((a, b) => a.title.localeCompare(b.title));
			},
			sortAlphaZA() {
				this.bayobjects.sort((a, b) => b.title.localeCompare(a.title));
			},
			sortUpdatedAtASC() {
				this.bayobjects.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
			},
			sortUpdatedAtDESC() {
				this.bayobjects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
			},
			editBayobject(b) {
				this.$router.push({ path: `${this.rootPath}${b._id}/edit` });
			},
			deleteBayobject(b) {
				this.$emit("delete-bayobject", b);
			},
		},
		destroyed() {
			window.removeEventListener("resize", this.setPerPage);
		},
	};
</script>

<style></style>
