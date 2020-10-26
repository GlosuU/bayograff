<template>
	<div id="login" class="bayobtns floatRight">
		<div v-if="$auth.loading">
			<LoadingCircle />
		</div>
		<div v-if="!$auth.loading">
			<!-- show login when not authenticated -->
			<b-button v-if="!$auth.isAuthenticated" @click="login" variant="primary">
				<b-icon icon="power" /> Log in / Sign up
			</b-button>
			<!-- show logout when authenticated -->
			<div v-if="$auth.isAuthenticated">
				<b-card-img-lazy
					:src="$auth.user.picture"
					alt="User's picture"
					width="50px"
					height="50px"
					rounded="circle"
					left
					fluid
				/>
				<span class="margin5">
					Welcome, <strong>{{ $auth.user.name }}!</strong>
				</span>
				<b-button @click="logout" variant="dark">
					<b-icon icon="power" /> Log out
				</b-button>
			</div>
		</div>
	</div>
</template>

<script>
	import Circle from "vue-loading-spinner/src/components/Circle";

	export default {
		components: {
			LoadingCircle: Circle,
		},
		methods: {
			// Log the user in
			login() {
				this.$auth.loginWithRedirect({ appState: { targetUrl: "/reporterms" } });
			},
			// Log the user out
			logout() {
				this.$auth.logout({
					returnTo: window.location.origin,
				});
				this.$nReporterms = -1;
				this.$nAnecdaynotes = -1;
				this.$nFactales = -1;
			},
		},
	};
</script>

<style></style>
