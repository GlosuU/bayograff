const exportcollection = require("./exportcollection");
const parsehtml = require("./parsehtml");
const fs = require("fs");

// Extract the titles of all Reporterms to text
function bayobjectCollectionSummary(bayobjects) {
	let summary = "";
	bayobjects.forEach((b) => {
		summary += `*\t${b.title}\n`;
	});

	return summary;
}

// Extract the whole content of a reporterm to text
function reportermToText(reporterm) {
	const startDate = new Date(reporterm.startDate);
	const endDate = new Date(reporterm.endDate);

	let repTxt = `TITLE: ${reporterm.title}\nPERIOD: ${startDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})} - ${endDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})}\n\n${parsehtml.getTextContent(reporterm.content)}`;

	if (reporterm.image.startsWith("http")) {
		repTxt += `\n\nIMAGE: ${reporterm.image}`;
	}

	return repTxt;
}

// Extract the whole content of an anecdaynote to text
function anecdaynoteToText(anecdaynote) {
	const date = new Date(anecdaynote.date);

	let anecTxt = `TITLE: ${anecdaynote.title}\nDATE: ${date.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})}\n\n${parsehtml.getTextContent(anecdaynote.content)}`;

	if (anecdaynote.image.startsWith("http")) {
		anecTxt += `\n\nIMAGE: ${anecdaynote.image}`;
	}

	return anecTxt;
}

// Extract the whole content of a factale to text
function factaleToText(factale) {
	let factTxt = `TITLE: ${factale.title}\n\n${parsehtml.getTextContent(factale.content)}`;

	if (factale.image.startsWith("http")) {
		factTxt += `\n\nIMAGE: ${factale.image}`;
	}

	return factTxt;
}

// Transform the whole biography of a user to a .txt file
// @return	The URL of the created .txt file, ready for download
async function collectionToTxt(user, title, bayograff_app_url) {
	const { reporterms, anecdaynotes, factales } = await exportcollection.getCollectionRaw(user);
	const fileName = exportcollection.getFileName(user, "txt");

	let lines = "";
	if (title) {
		lines += `${title.toUpperCase()}\n\n`;
	}

	// Reporterms
	if (reporterms) {
		lines += "///////////////////////\n\nREPORTERMS:\n\n";
		lines += bayobjectCollectionSummary(reporterms);
		lines += "\n///////////////////////\n\n";

		reporterms.forEach((r) => {
			lines += `${reportermToText(r)}\n\n====================\n\n`;
		});
	}

	// Anecdaynotes
	if (anecdaynotes) {
		lines += "///////////////////////\n\nANECDAYNOTES:\n\n";
		lines += bayobjectCollectionSummary(anecdaynotes);
		lines += "\n///////////////////////\n\n";

		anecdaynotes.forEach((a) => {
			lines += `${anecdaynoteToText(a)}\n\n====================\n\n`;
		});
	}

	// Factales
	if (factales) {
		lines += "///////////////////////\n\nFACTALES:\n\n";
		lines += bayobjectCollectionSummary(factales);
		lines += "\n///////////////////////\n\n";

		factales.forEach((f) => {
			lines += `${factaleToText(f)}\n\n====================\n\n`;
		});
	}

	await fs.writeFile(`./server/public/text/${fileName}`, lines, (err) => {
		if (err) throw err;
		console.log(`Saved successfully to ${fileName}`);
	});

	return `${bayograff_app_url}/public/text/${fileName}`;
}

module.exports = {
	collectionToTxt,
};
