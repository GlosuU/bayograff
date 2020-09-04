const express = require("express");
const mongodb = require("mongodb");
const path = require("path");
const fs = require("fs");
const { db_name, db_url } = require("../../config");

const router = express.Router();
const latex_online_url = "http://latexonline.cc/compile?url=";

async function loadReportermsCollection() {
	const client = await mongodb.MongoClient.connect(db_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client.db(db_name).collection("reporterms");
}

async function collectionToTxt() {
	const reporterms = await loadReportermsCollection();
	const textArray = reporterms.find({}).toArray();
	console.log(textArray);

	fs.writeFile("../../public/text/output.txt", "Hello", (err) => {
		if (err) throw err;
		console.log("Saved!");
	});
}

// Send Latex file
router.get("/", (req, res) => {
	collectionToTxt();
	res.sendFile(path.resolve(__dirname, "../../public/text/output.txt"));
});

module.exports = router;
