const exportcollection = require("./exportcollection");
const parsehtml = require("./parsehtml");
const fs = require("fs");

// Extract the whole content of a reporterm to LaTeX
function reportermToLatex(reporterm) {
	const startDate = new Date(reporterm.startDate);
	const endDate = new Date(reporterm.endDate);

	let repLatex = `\\section{${reporterm.title}}
\\begin{center}
\\textbf{${startDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})} - ${endDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})}}
\\end{center}
\\vspace{3mm}
\n${parsehtml.getLatexContent(reporterm.content)}\n\n`;

	// if (reporterm.image) {
	// 	repLatex += `\n\n\\externalfigure[${reporterm.image}]`;
	// }

	if (reporterm.anecdaynotes) {
		reporterm.anecdaynotes.forEach((a) => {
			repLatex += anecdaynoteToLatex(a);
		});
	}

	return repLatex;
}

// Extract the whole content of an anecdaynote to LaTeX
function anecdaynoteToLatex(anecdaynote) {
	const date = new Date(anecdaynote.date);

	let anecLatex = `\\subsection{${anecdaynote.title}}
\\begin{center}
\\textbf{${date.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	})}}
\\end{center}
\\vspace{3mm}
\n${parsehtml.getLatexContent(anecdaynote.content)}\n\n`;

	// if (anecdaynote.image) {
	// 	anecLatex += `\n\n\\externalfigure[${anecdaynote.image}]`;
	// }

	return anecLatex;
}

// Extract the whole content of a factale to LaTeX
function factaleToLatex(factale) {
	let factLatex = `\\section{${factale.title}}
\n${parsehtml.getLatexContent(factale.content)}\n\n`;

	// if (factale.image) {
	// 	factLatex += `\n\n\\externalfigure[${factale.image}]`;
	// }

	return factLatex;
}

// Transform the whole biography of a user to a .tex file
// @return	The URL of the created .tex file, ready for download
async function collectionToLatex(user, bayograff_app_url) {
	const { reporterms, factales } = await exportcollection.getCollectionOrganized(user);
	const fileName = exportcollection.getFileName(user, "tex");

	let lines = `\\documentclass[12pt, a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{ulem}

\\author{GlosuU}
\\title{Bayograff - Latex Output}

\\begin{document}
\\maketitle
\\newpage
\\tableofcontents
\\newpage
\n`;

	reporterms.forEach((r) => {
		lines += `${reportermToLatex(r)}`;
	});

	if (factales) {
		lines += `\\appendix\n\n`;
		factales.forEach((f) => {
			lines += `${factaleToLatex(f)}`;
		});
	}

	lines += "\\end{document}";

	await fs.writeFile(`./server/public/latex/${fileName}`, lines, (err) => {
		if (err) throw err;
		console.log(`Saved successfully to ${fileName}`);
	});

	return `${bayograff_app_url}/public/latex/${fileName}`;
}

module.exports = {
	collectionToLatex,
};
