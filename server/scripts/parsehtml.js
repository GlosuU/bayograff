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

module.exports = {
	// txt Content strips most of the HTML
	getTextContent: (htmlContent) => {
		let textContent = htmlContent;
		textContent = textContent.replace(regex.endP, "\n\n");
		textContent = textContent.replace(regex.list_item, "* ");
		textContent = textContent.replace(regex.allTags, "");
		textContent = textContent.replace(regex.lessthan, "<");
		textContent = textContent.replace(regex.greaterthan, ">");
		textContent = textContent.replace(regex.trimSpaces, "");
		return textContent;
	},
	// Latex Content parses the HTML into Latex tags
	// latexContent = latexContent.replace(regex.italics, "\\textit{");
	getLatexContent: (html) => {
		let latexContent = html;
		latexContent = latexContent.replace(regex.bold, "\\textbf{");
		latexContent = latexContent.replace(regex.italics, "\\textit{");
		latexContent = latexContent.replace(regex.underline, "\\underline{");
		latexContent = latexContent.replace(regex.strikethru, "\\sout{");
		latexContent = latexContent.replace(regex.closetag, "}");
		latexContent = latexContent.replace(regex.list_item, "\\item ");
		latexContent = latexContent.replace(regex.unordered_list_open, "\\begin{itemize}");
		latexContent = latexContent.replace(regex.unordered_list_close, "\\end{itemize}");
		latexContent = latexContent.replace(regex.ordered_list_open, "\\begin{enumerate}");
		latexContent = latexContent.replace(regex.ordered_list_close, "\\end{enumerate}");
		latexContent = latexContent.replace(regex.endP, "\n\n");
		latexContent = latexContent.replace(regex.allTags, "");
		latexContent = latexContent.replace(regex.lessthan, "<");
		latexContent = latexContent.replace(regex.greaterthan, ">");
		latexContent = latexContent.replace(regex.trimSpaces, "");
		return latexContent;
	},
};
