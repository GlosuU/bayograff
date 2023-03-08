const express = require("express");
const path = require("path");
const checkJWT = require("../../middleware/auth");
const export2text = require("../../scripts/export2text");
const export2latex = require("../../scripts/export2latex");
const { environment, port } = require("../../config/config");

const router = express.Router();

const latex_online_url = "https://latexonline.cc/compile?url=";
let bayograff_app_url = "";
if (environment === "development") {
	bayograff_app_url = `https://localhost:${port}`;
} else {
	bayograff_app_url = "https://bayograff.onrender.com";
}

// @desc    Send the whole biography as a .txt file
// @route   GET /api/export/txt
router.get("/txt", checkJWT, async (req, res) => {
	try {
		res.send(
			await export2text.collectionToTxt(req.user.sub, req.query.title, bayograff_app_url)
		);
	} catch (err) {
		// console.error(err);
		res.status(500).send();
	}
});

// @desc    Send the whole biography as a .tex file
// @route   GET /api/export/latex
router.get("/latex", checkJWT, async (req, res) => {
	try {
		res.send(
			await export2latex.collectionToLatex(req.user.sub, req.query.title, bayograff_app_url)
		);
	} catch (err) {
		// console.error(err);
		res.status(500).send();
	}
});

// @desc    Send the whole biography as a .pdf file
// @route   GET /api/export/pdf
router.get("/pdf", checkJWT, async (req, res) => {
	try {
		const texFileURL = await export2latex.collectionToLatex(
			req.user.sub,
			req.query.title,
			bayograff_app_url
		);
		res.send(`${latex_online_url}${texFileURL}`);

		// If you want this to work in development, upload the .tex file somewhere else in the cloud
		// res.send(`${latex_online_url}$http://bayograff.herokuapp.com/api/export/sample`);
	} catch (err) {
		// console.error(err);
		res.status(500).send();
	}
});

// @desc    Send a sample .tex file
// @route   GET /api/export/sample
router.get("/sample", async (req, res) => {
	res.sendFile(path.resolve(__dirname, `../../public/latex/sample.tex`));
});

module.exports = router;
