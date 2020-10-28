const regex = {
	lessthan: /(&lt;)/gi,
	greaterthan: /(&gt;)/gi,
	endP: /(<\/p>)/gi,
	l_item: /(<li>)/gi,
	allTags: /(<([^>]+)>)/gi,
	trimSpaces: /^\s+|\s+$/g,
	bold: /(<strong>)/gi,
	italics: /(<em>)/gi,
	underline: /(<u>)/gi,
	closetag: /(<\/(strong|em|u)>)/gi,
};

module.exports = {
	// txt Content strips most of the HTML
	getTextContent: (htmlContent) => {
		let textContent = htmlContent;
		textContent = textContent.replace(regex.endP, "\n\n");
		textContent = textContent.replace(regex.l_item, "* ");
		textContent = textContent.replace(regex.allTags, "");
		textContent = textContent.replace(regex.lessthan, "<");
		textContent = textContent.replace(regex.greaterthan, ">");
		textContent = textContent.replace(regex.trimSpaces, "");
		return textContent;
	},
	// Latex Content parses the HTML into Latex tags
	getLatexContent: (html) => {
		let latexContent = html;
		latexContent = latexContent.replace(regex.bold, "\\textbf{");
		latexContent = latexContent.replace(regex.italics, "\\textit{");
		latexContent = latexContent.replace(regex.underline, "\\underline{");
		latexContent = latexContent.replace(regex.closetag, "}");
		latexContent = latexContent.replace(regex.endP, "\n\n");
		latexContent = latexContent.replace(regex.l_item, "* ");
		latexContent = latexContent.replace(regex.allTags, "");
		latexContent = latexContent.replace(regex.lessthan, "<");
		latexContent = latexContent.replace(regex.greaterthan, ">");
		latexContent = latexContent.replace(regex.trimSpaces, "");
		return latexContent;
	},
};
