<template>
	<div id="nav">
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<router-link to="/" exact>Home</router-link>
					<router-link to="/reporterms">Reporterms</router-link>
					<router-link to="/about">Anecdaynotes</router-link>
					<router-link to="/about">Factales</router-link>
					<router-link to="/export">Print/Export</router-link>
					<router-link to="/profile">My Profile</router-link>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	export default {};
</script>

<style>
	/* #nav {
		position: fixed 
		padding-bottom: 10px;
	} */

	#nav a {
		font-weight: bold;
		color: white;
		padding-right: 10px;
		cursor: pointer;
	}

	#nav a.router-link-active {
		color: #ffea2e;
	}
</style>
