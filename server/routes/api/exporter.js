const express = require("express");
const mongodb = require("mongodb");
const path = require("path");
const fs = require("fs");
const { db_name, db_url } = require("../../config");

const router = express.Router();
const latex_online_url = "http://latexonline.cc/compile?url=";
const bayograff_latex_url = "https://bayograff.herokuapp.com/api/export/latex";

async function loadReportermsCollection() {
	const client = await mongodb.MongoClient.connect(db_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client.db(db_name).collection("reporterms");
}

//// .TXT EXPORT

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

//// LATEX EXPORT

function reportermToLatex(reporterm) {
	const startDate = new Date(reporterm.startDate);
	const endDate = new Date(reporterm.endDate);

	let repLatex = `\\subsection{${reporterm.title}}\n${startDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})} - ${endDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})}\n\n${reporterm.content}\n\n`;

	// if (reporterm.image) {
	// 	repLatex += `\\externalfigure[${reporterm.image}]`;
	// }

	return repLatex;
}

function collectionToLatex(reporterms, fileName, next) {
	let lines = `\\documentclass[12pt, a4paper]{article}
\\usepackage[utf8]{inputenc}

\\author{GlosuU}
\\title{Bayograff - Latex Output}
\\date{Today}

\\begin{document}
\\maketitle
\\tableofcontents
\\section{Reporterms}\n\n`;
	reporterms.forEach((r) => {
		lines += `${reportermToLatex(r)}\n\n`;
	});
	lines += "\\end{document}";

	fs.writeFile(`./server/public/latex/${fileName}.tex`, lines, next);
}

//// ROUTES

// Send .txt file
router.get("/txt", async (req, res) => {
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

// Send Latex file
router.get("/latex", async (req, res) => {
	const reporterms = await loadReportermsCollection();
	reporterms
		.find({})
		.toArray()
		.then((reps) => {
			const fileName = `latexoutput_${new Date().getTime()}`;
			collectionToLatex(reps, fileName, (err) => {
				if (err) throw err;
				console.log(`Saved to ${fileName}.tex`);
				res.sendFile(path.resolve(__dirname, `../../public/latex/${fileName}.tex`));
			});
		})
		.catch((err) => console.log(err));
});

// Send PDF file
router.get("/pdf", async (req, res) => {
	res.redirect(`${latex_online_url}${bayograff_latex_url}`);
});

// Send sample latex file
router.get("/sample", async (req, res) => {
	res.sendFile(path.resolve(__dirname, `../../public/latex/sample.tex`));
});

module.exports = router;
