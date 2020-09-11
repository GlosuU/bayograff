<template>
	<div id="export">
		<h1>Export Biography</h1>
		<p>Click on a button below to download the biography in the desired format.</p>
		<p>If the biography is of another person, please enter their name here first:</p>
		<b-form inline>
			<b-form-group id="name-input-group" label="Name:" label-for="name-input">
				<b-form-input id="name-input" v-model="name" required></b-form-input>
			</b-form-group>
		</b-form>
		<br />
		<h2>Formats</h2>
		<ul id="formats">
			<li>
				<b-button href="api/export/pdf" target="_blank">PDF</b-button>
				- Recommended format. Biography ready to print.
			</li>
			<li>
				<b-button href="api/export/latex" target="_blank">LaTeX</b-button>
				- If you prefer the uncompiled .tex file.
			</li>
			<li>
				<b-button href="api/export/txt" target="_blank">Plain Text</b-button>
				- Get all the data in a simple .txt file.
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: "The author",
				err: "",
			};
		},
	};
</script>

<style>
	#export {
		padding: 10px;
	}
	#name-input {
		padding-left: 10px;
	}
	#formats li {
		padding-bottom: 10px;
	}
</style>
