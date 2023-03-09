const express = require("express");
const path = require("path");
const checkJWT = require("../../middleware/auth");
const export2text = require("../../scripts/export2text");
const export2latex = require("../../scripts/export2latex");
const { environment, port, prod_domain_url } = require("../../config/config");

const router = express.Router();

const latex_online_url = "https://latexonline.cc/compile?url=";
const domain_url = (environment === "development") ? `localhost:${port}` : prod_domain_url;

// @desc    Send the whole biography as a .txt file
// @route   GET /api/export/txt
router.get("/txt", checkJWT, async (req, res) => {
	try {
		res.send(
			await export2text.collectionToTxt(req.user.sub, req.query.title, domain_url)
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
			await export2latex.collectionToLatex(req.user.sub, req.query.title, domain_url)
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
		if (environment === "production") {
			const texFileURL = await export2latex.collectionToLatex(
				req.user.sub,
				req.query.title,
				domain_url
			);
			res.send(`${latex_online_url}${texFileURL}`);
		} else {
			// In non-prod environments, we create a PDF from the sample file stored in the prod domain
			res.send(`${latex_online_url}http://${prod_domain_url}/api/export/sample`);
		}
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
