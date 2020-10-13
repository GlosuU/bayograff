<template>
	<div id="sortbuttons">
		<b-button id="sortdate" variant="light" @click="sortDate">
			<b-icon v-if="dateDESC" icon="sort-numeric-down-alt" />
			<b-icon v-if="!dateDESC" icon="sort-numeric-down" />
			Sort by date
			{{ dateDESC ? "(DES)" : "(ASC)" }}
		</b-button>
		<b-button id="sortalpha" variant="light" @click="sortAlpha">
			<b-icon v-if="alphaAZ" icon="sort-alpha-down" />
			<b-icon v-if="!alphaAZ" icon="sort-alpha-down-alt" />
			Sort alphabetically by title
			{{ alphaAZ ? "(A→Z)" : "(Z→A)" }}
		</b-button>
		<b-button id="sortupdatedat" variant="light" @click="sortUpdatedAt">
			<b-icon v-if="updatedAtDESC" icon="sort-down" />
			<b-icon v-if="!updatedAtDESC" icon="sort-down-alt" />
			Sort by last update
			{{ updatedAtDESC ? "(DES)" : "(ASC)" }}
		</b-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dateDESC: true,
				alphaAZ: true,
				updatedAtDESC: true,
			};
		},
		methods: {
			sortDate(evt) {
				evt.preventDefault();
				if (this.dateDESC) {
					this.$emit("sort-date-desc");
				} else {
					this.$emit("sort-date-asc");
				}
				this.dateDESC = !this.dateDESC;
				this.alphaAZ = true;
				this.updatedAtDESC = true;
			},
			sortAlpha(evt) {
				evt.preventDefault();
				if (this.alphaAZ) {
					this.$emit("sort-alpha-az");
				} else {
					this.$emit("sort-alpha-za");
				}
				this.dateDESC = false;
				this.alphaAZ = !this.alphaAZ;
				this.updatedAtDESC = true;
			},
			sortUpdatedAt(evt) {
				evt.preventDefault();
				if (this.updatedAtDESC) {
					this.$emit("sort-updated-at-desc");
				} else {
					this.$emit("sort-updated-at-asc");
				}
				this.dateDESC = false;
				this.alphaAZ = true;
				this.updatedAtDESC = !this.updatedAtDESC;
			},
		},
	};
</script>

<style>
	#sortbuttons {
		text-align: center;
	}

	#sortbuttons button {
		margin-right: 10px;
	}
</style>
