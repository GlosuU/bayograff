<template>
	<div id="nav">
		<b-navbar toggleable="md" type="dark" variant="info">
			<b-navbar-toggle target="nav-collapse" />
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<router-link to="/" exact> <b-icon icon="house" />Home </router-link>
					<router-link to="/reporterms">
						<b-icon icon="journal" />Reporterms
					</router-link>
					<router-link to="/about">
						<b-icon icon="file-earmark" />Anecdaynotes
					</router-link>
					<router-link to="/about">
						<b-icon icon="patch-exclamation" /> Factales
					</router-link>
					<router-link to="/export"> <b-icon icon="printer" /> Print/Export </router-link>
					<router-link to="/about"> <b-icon icon="info-circle" /> About </router-link>
					<router-link to="/profile"><b-icon icon="person" />My Profile</router-link>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	export default {};
</script>

<style>
	#nav a {
		font-weight: bold;
		color: white;
		padding-right: 10px;
		cursor: pointer;
		margin: 1px;
	}

	#nav a.router-link-active {
		color: #ffea2e;
	}
</style>
