const mongoose = require("mongoose");
const { db_url } = require("./config");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(db_url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
			autoIndex: false, // Mongoose doc recommends autoindex=false in production...
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
		process.env.DB_MESSAGE = `MongoDB Connected: ${conn.connection.host}`;
		console.log(`DB_MESSAGE=${process.env.DB_MESSAGE}`)
	} catch (err) {
		console.error(err);
		process.env.DB_MESSAGE= `${err}`;
		console.log(`DB_MESSAGE=${process.env.DB_MESSAGE}`)
	}
};

module.exports = connectDB;
