if (process.env.NODE_ENV === "development") {
	const dotenv = require("dotenv");
	dotenv.config();
}

module.exports = {
	db_name: process.env.DB_NAME,
	db_url:
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
		`@${process.env.DB_CLUSTER}.2bhrc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
	domain: process.env.VUE_APP_AUTH0_DOMAIN,
	audience: process.env.VUE_APP_AUTH0_AUDIENCE,
};
