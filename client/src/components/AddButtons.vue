<template>
	<div id="addbuttons">
		<b-button to="/reporterms/new">New Reporterm</b-button>
		<b-button>New Anecdaynote</b-button>
		<b-button>New Factale</b-button>
		<b-form @submit="searchText" inline>
			<b-form-input
				v-model="textToSearch"
				class="mr-sm-2"
				placeholder="Search"
				required
			></b-form-input>
			<b-button class="my-2 my-sm-0" type="submit">Search</b-button>
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
