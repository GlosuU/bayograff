<template>
	<div id="login" v-if="!$auth.loading">
		<!-- show login when not authenticated -->
		<button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
		<!-- show logout when authenticated -->
		<div v-if="$auth.isAuthenticated">
			<strong>Welcome {{ $auth.user.name }}!</strong>
			<b-button @click="logout">Log out</b-button>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			// Log the user in
			login() {
				console.log(window.location.origin);
				this.$auth.loginWithRedirect();
			},
			// Log the user out
			logout() {
				this.$auth.logout({
					returnTo: window.location.origin,
				});
			},
		},
	};
</script>

<style></style>
