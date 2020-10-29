const exportcollection = require("./exportcollection");
const parsehtml = require("./parsehtml");
const fs = require("fs");

// Extract the titles of all Reporterms to text
function reportermCollectionSummary(reporterms) {
	let summary = "";
	reporterms.forEach((r) => {
		summary += `*\t${r.title}\n`;
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

	// if (reporterm.image) {
	// 	repTxt += `\n\nIMAGE: ${reporterm.image}`;
	// }

	return repTxt;
}

// Transform the whole biography of a user to a .txt file
// @return	The URL of the created .txt file, ready for download
async function collectionToTxt(user, bayograff_app_url) {
	const { reporterms } = await exportcollection.getCollectionRaw(user);
	const fileName = exportcollection.getFileName(user, "txt");

	let lines = "";

	// Reporterms
	if (reporterms) {
		lines += "REPORTERMS:\n\n";
		lines += reportermCollectionSummary(reporterms);
		lines += "\n====================\n\n";

		reporterms.forEach((r) => {
			lines += `${reportermToText(r)}\n\n====================\n\n`;
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
