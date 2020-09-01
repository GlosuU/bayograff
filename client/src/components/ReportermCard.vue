<template>
	<div id="reportermcard">
		<b-card no-body class="overflow-hidden">
			<b-row no-gutters>
				<b-col md="3">
					<b-card-img-lazy
						:src="reporterm.image"
						alt="Image"
						class="rounded-0"
					></b-card-img-lazy>
				</b-col>
				<b-col md="2">
					<b-card-body>
						<b-card-text id="card-dates-text">
							<p>
								{{
									reporterm.startDate.toLocaleDateString(undefined, {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								}}
							</p>
							<p>-</p>
							<p>
								{{
									reporterm.endDate.toLocaleDateString(undefined, {
										year: "numeric",
										month: "short",
										day: "numeric",
									})
								}}
							</p>
						</b-card-text>
					</b-card-body>
				</b-col>
				<b-col md="7">
					<b-card-body :title="reporterm.title">
						<b-card-text>{{ reporterm.content.replace("\n", "\\") }}</b-card-text>
					</b-card-body>
				</b-col>
			</b-row>
		</b-card>
	</div>
</template>

<script>
	export default {
		props: ["reporterm"],
	};
</script>

<style>
	#reportermcard {
		margin: 10px;
	}

	#card-dates-text {
		text-align: center;
	}
</style>
