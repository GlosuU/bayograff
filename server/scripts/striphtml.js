const regex = {
	lessthan: /(&lt;)/gi,
	greaterthan: /(&gt;)/gi,
	endP: /(<\/p>)/gi,
	l_item: /(<li>)/gi,
	allTags: /(<([^>]+)>)/gi,
	trimSpaces: /^\s+|\s+$/g,
};

module.exports = {
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
};
