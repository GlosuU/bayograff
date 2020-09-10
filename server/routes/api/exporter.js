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

function reportermToText(reporterm) {
	const startDate = new Date(reporterm.startDate);
	const endDate = new Date(reporterm.endDate);

	let repTxt = `${reporterm.title}\n${startDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})} - ${endDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})}\n\n${reporterm.content}\n\n`;

	if (reporterm.image) {
		repTxt += `IMAGE: ${reporterm.image}`;
	}

	return repTxt;
}

function collectionToTxt(reporterms, fileName, next) {
	let lines = "REPORTERMS:\n\n";
	reporterms.forEach((r) => {
		lines += `====================\n\n${reportermToText(r)}\n\n`;
	});
	lines += "====================";

	fs.writeFile(`./server/public/text/${fileName}.txt`, lines, next);
}

// Send .txt file
router.get("/", async (req, res) => {
	const reporterms = await loadReportermsCollection();
	reporterms
		.find({})
		.toArray()
		.then((reps) => {
			const fileName = `txtoutput_${new Date().getTime()}`;
			collectionToTxt(reps, fileName, (err) => {
				if (err) throw err;
				console.log(`Saved to ${fileName}.txt`);
				res.sendFile(path.resolve(__dirname, `../../public/text/${fileName}.txt`));
			});
		})
		.catch((err) => console.log(err));
});

module.exports = router;
