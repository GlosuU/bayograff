const regex = {
	bold: /(<strong>)/gi,
	italics: /(<em>)/gi,
	underline: /(<u>)/gi,
	strikethru: /(<s>)/gi,
	list_item: /(<li>)/gi,
	ordered_list_open: /(<ol>)/gi,
	ordered_list_close: /(<\/ol>)/gi,
	unordered_list_open: /(<ul>)/gi,
	unordered_list_close: /(<\/ul>)/gi,
	closetag: /(<\/(strong|em|u|s)>)/gi,
	lessthan: /(&lt;)/gi,
	greaterthan: /(&gt;)/gi,
	endP: /(<\/p>)/gi,
	allTags: /(<([^>]+)>)/gi,
	trimSpaces: /^\s+|\s+$/g,
};

// Subfunction: strips the remainder of HTML tags
function stripHTML(html) {
	let strippedText = html;
	strippedText = strippedText.replace(regex.endP, "\n\n");
	strippedText = strippedText.replace(regex.allTags, "");
	strippedText = strippedText.replace(regex.lessthan, "<");
	strippedText = strippedText.replace(regex.greaterthan, ">");
	strippedText = strippedText.replace(regex.trimSpaces, "");
	return strippedText;
}

module.exports = {
	// txt Content strips most of the HTML
	getTextContent: (htmlContent) => {
		let textContent = htmlContent;
		textContent = textContent.replace(regex.list_item, "* ");
		textContent = stripHTML(textContent);
		return textContent;
	},
	// Latex Content parses the HTML into Latex tags
	getLatexContent: (html) => {
		let latexContent = html;
		latexContent = latexContent.replace(regex.bold, "\\textbf{");
		latexContent = latexContent.replace(regex.italics, "\\textit{");
		latexContent = latexContent.replace(regex.underline, "\\underline{");
		latexContent = latexContent.replace(regex.strikethru, "\\sout{");
		latexContent = latexContent.replace(regex.closetag, "}");
		latexContent = latexContent.replace(regex.list_item, "\\item ");
		latexContent = latexContent.replace(regex.unordered_list_open, "\\begin{itemize}\n");
		latexContent = latexContent.replace(regex.unordered_list_close, "\\end{itemize}\n");
		latexContent = latexContent.replace(regex.ordered_list_open, "\\begin{enumerate}\n");
		latexContent = latexContent.replace(regex.ordered_list_close, "\\end{enumerate}\n");
		latexContent = stripHTML(latexContent);
		return latexContent;
	},
};
