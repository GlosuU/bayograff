const express = require("express");
const path = require("path");
const fs = require("fs");
const checkJWT = require("../../middleware/auth");
const Reporterm = require("../../models/Reporterm");
const { environment, port } = require("../../config/config");

const router = express.Router();

const latex_online_url = "http://latexonline.cc/compile?url=";
let bayograff_app_url = "";
if (environment === "development") {
	bayograff_app_url = `http://localhost:${port}`;
} else {
	bayograff_app_url = "http://bayograff.herokuapp.com";
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

// @desc    Send the whole biography as a .txt file
// @route   GET /api/export/txt
router.get("/txt", checkJWT, async (req, res) => {
	try {
		const reporterms = await Reporterm.find({
			user: req.user.sub,
		});

		// Use the last 3 digits of the user ID to increase variance in file name
		const userfootprint = req.user.sub.slice(-3);

		const fileName = `bayograff_${userfootprint}-${new Date().getTime()}`;

		collectionToTxt(reporterms, fileName, (err) => {
			if (err) throw err;
			console.log(`Saved successfully to ${fileName}.txt`);
			res.send(`${bayograff_app_url}/public/text/${fileName}.txt`);
			// res.sendFile(path.resolve(__dirname, `../../public/text/${fileName}.txt`));
		});
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// @desc    Send the whole biography as a .tex file
// @route   GET /api/export/latex
router.get("/latex", checkJWT, async (req, res) => {
	try {
		const reporterms = await Reporterm.find({
			user: req.user.sub,
		});

		// Use the last 3 digits of the user ID to increase variance in file name
		const userfootprint = req.user.sub.slice(-3);

		const fileName = `bayograff_${userfootprint}-${new Date().getTime()}`;

		collectionToLatex(reporterms, fileName, (err) => {
			if (err) throw err;
			console.log(`Saved successfully to ${fileName}.tex`);
			res.send(`${bayograff_app_url}/public/latex/${fileName}.tex`);
			// res.sendFile(path.resolve(__dirname, `../../public/latex/${fileName}.tex`));
		});
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// @desc    Send the whole biography as a .pdf file
// @route   GET /api/export/pdf
router.get("/pdf", checkJWT, async (req, res) => {
	try {
		const reporterms = await Reporterm.find({
			user: req.user.sub,
		});

		// Use the last 3 digits of the user ID to increase variance in file name
		const userfootprint = req.user.sub.slice(-3);

		const fileName = `bayograff_${userfootprint}-${new Date().getTime()}`;

		collectionToLatex(reporterms, fileName, (err) => {
			if (err) throw err;
			console.log(`Saved successfully to ${fileName}.tex`);
			// If you want this to work in development, upload the .tex file somewhere else in the cloud
			// res.send(`${latex_online_url}$http://bayograff.herokuapp.com/api/export/sample`);
			res.send(`${latex_online_url}${bayograff_app_url}/public/latex/${fileName}.tex`);
			// res.redirect(`${latex_online_url}${bayograff_app_url}/public/latex/${fileName}.tex`);
		});
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// @desc    Send a sample .tex file
// @route   GET /api/export/sample
router.get("/sample", async (req, res) => {
	res.sendFile(path.resolve(__dirname, `../../public/latex/sample.tex`));
});

module.exports = router;
