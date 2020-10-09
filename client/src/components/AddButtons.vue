<template>
	<div id="addbuttons">
		<b-button to="/reporterms/new" variant="dark">
			<b-icon icon="journal-plus" /> New Reporterm
		</b-button>
		<b-button variant="dark"> <b-icon icon="file-earmark-plus" /> New Anecdaynote</b-button>
		<b-button variant="dark"> <b-icon icon="patch-plus" /> New Factale</b-button>
		<b-form @submit="searchText" inline>
			<b-form-input
				v-model="textToSearch"
				class="mr-sm-2"
				placeholder="Search by text"
				required
			></b-form-input>
			<b-button class="my-2 my-sm-0" type="submit">
				<b-icon icon="search" /> Search
			</b-button>
		</b-form>
		<div class="clear" />
	</div>
</template>

<script>
	export default {
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
		},
	};
</script>

<style>
	#addbuttons {
		margin: 10px;
	}

	#addbuttons a {
		margin-right: 10px;
	}

	#addbuttons button {
		margin-right: 10px;
	}

	#addbuttons form {
		float: right;
	}
</style>
