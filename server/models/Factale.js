const mongoose = require("mongoose");

const factaleSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		index: true,
		trim: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
	},
	content: {
		type: String,
		required: true,
		trim: true,
	},
	image: {
		type: String,
		default: "https://dapp.dblog.org/img/default.jpg",
		trim: true,
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

module.exports = mongoose.model("Factale", factaleSchema);
