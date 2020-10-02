const mongoose = require("mongoose");
const { db_url } = require("./config");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(db_url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
	}
};

module.exports = connectDB;
