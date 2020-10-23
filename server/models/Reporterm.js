const mongoose = require("mongoose");

const reportermSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		index: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	title: {
		type: String,
		required: true,
		// trim: true,
	},
	content: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: "https://dapp.dblog.org/img/default.jpg",
		// enum: ["public", "private"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Reporterm", reportermSchema);
