<template>
	<form action="https://www.paypal.com/donate" method="post" target="_blank">
		<input type="hidden" name="cmd" value="_donations" />
		<input type="hidden" name="business" :value="donationCode" />
		<input type="hidden" name="item_name" value="Support Bayograff Website" />
		<input type="hidden" name="currency_code" value="EUR" />
		<input
			type="image"
			:src="buttonImg"
			border="0"
			name="submit"
			title="PayPal - The safer, easier way to pay online!"
			alt="Donate with PayPal button"
		/>
		<img
			alt=""
			border="0"
			src="https://www.paypal.com/en_ES/i/scr/pixel.gif"
			width="1"
			height="1"
		/>
	</form>
</template>

<script>
	export default {
		props: ["big"],
		data() {
			return {
				donationCode: process.env.VUE_APP_DONATION_CODE,
				buttonImg: this.big
					? "https://www.paypalobjects.com/en_US/ES/i/btn/btn_donateCC_LG.gif"
					: "https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif",
			};
		},
	};
</script>

<style></style>
