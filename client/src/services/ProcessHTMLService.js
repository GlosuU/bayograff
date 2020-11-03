const regex = {
	lessthan: /(&lt;)/gi,
	greaterthan: /(&gt;)/gi,
	nonbreakingspace: /(&nbsp;)/gi,
	endP: /(<\/p>)/gi,
	l_item: /(<li>)/gi,
	allTags: /(<([^>]+)>)/gi,
	trimSpaces: /^\s+|\s+$/g,
};

class ProcessHTMLService {
	static getCardContent(htmlContent) {
		let cardContent = htmlContent;
		cardContent = cardContent.replace(regex.endP, " \\ ");
		cardContent = cardContent.replace(regex.l_item, " * ");
		cardContent = cardContent.replace(regex.allTags, "");
		cardContent = cardContent.replace(regex.lessthan, "<");
		cardContent = cardContent.replace(regex.greaterthan, ">");
		cardContent = cardContent.replace(regex.nonbreakingspace, " ");
		cardContent = cardContent.replace(regex.trimSpaces, "");
		return cardContent;
	}

	static getTextContent(htmlContent) {
		let textContent = htmlContent;
		textContent = textContent.replace(regex.endP, "\n\n");
		textContent = textContent.replace(regex.l_item, "* ");
		textContent = textContent.replace(regex.allTags, "");
		textContent = textContent.replace(regex.lessthan, "<");
		textContent = textContent.replace(regex.greaterthan, ">");
		textContent = textContent.replace(regex.nonbreakingspace, " ");
		textContent = textContent.replace(regex.trimSpaces, "");
		return textContent;
	}

	static getStrippedTagsContent(htmlContent) {
		return htmlContent.replace(regex.allTags, "");
	}
}

export default ProcessHTMLService;
