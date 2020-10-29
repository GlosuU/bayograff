const Reporterm = require("../models/Reporterm");
const Anecdaynote = require("../models/Anecdaynote");
const Factale = require("../models/Factale");
const e = require("express");

/**
 * Inserts all given anecdaynotes in their corresponding reporterms.
 * The method is a bit more complicated than expected because it takes into account
 * overlapping reporterms (something that we suggest the users not to create).
 *
 * @param {Array} reporterms
 * @param {Array} anecdaynotes
 */
function insertAnecsInReps(reporterms, anecdaynotes) {
	let repsWithAnecdaynotes = reporterms;

	// 1. Sort reporterms by smallest to biggest period
	repsWithAnecdaynotes = repsWithAnecdaynotes
		.map((r) => {
			const diffInMs = new Date(r.endDate) - new Date(r.startDate);
			const periodOfDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

			return {
				startDate: new Date(r.startDate),
				endDate: new Date(r.endDate),
				title: r.title,
				content: r.content,
				periodOfDays,
			};
		})
		.sort((a, b) => a.periodOfDays - b.periodOfDays);

	// 2. Each reporterm goes through the anecdaynotes and grabs those that happened during the reporterm
	// Anecdaynotes will be extracted from the array and thus not repeated if reporterms overlap
	// Finally reporterms are sorted by startDate once again
	let anecdaynotesLeft = anecdaynotes;
	repsWithAnecdaynotes = repsWithAnecdaynotes
		.map((r) => {
			const start = new Date(r.startDate);
			const end = new Date(r.endDate);

			let anecdaynotesInReporterm = [];

			if (anecdaynotesLeft.length > 0) {
				anecdaynotesLeft.forEach((a) => {
					const aDate = new Date(a.date);
					if (start <= aDate && aDate <= end) {
						anecdaynotesInReporterm.push(a);
						anecdaynotes.splice(anecdaynotes.indexOf(a), 1);
					}
				});
				anecdaynotesLeft = anecdaynotes;
			}

			return {
				...r,
				anecdaynotes: anecdaynotesInReporterm,
			};
		})
		.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

	// 3. Anecdaynotes left without Reporterm are gathered into one generic Reporterm that goes last
	if (anecdaynotesLeft.length > 0) {
		repsWithAnecdaynotes.push({
			startDate: new Date(anecdaynotesLeft[0].date),
			endDate: new Date(anecdaynotesLeft[anecdaynotesLeft.length - 1].date),
			title: "Other days worth remembering",
			content: "",
			image: "noImg",
			anecdotes: anecdaynotesLeft,
		});
	}

	return repsWithAnecdaynotes;
}

module.exports = {
	getCollectionOrganized: async (user) => {
		const reporterms = await Reporterm.find({ user }).sort({ startDate: 1 });
		const anecdaynotes = await Anecdaynote.find({ user }).sort({ date: 1 });

		return {
			reporterms: insertAnecsInReps(reporterms, anecdaynotes),
		};
	},
	getCollectionRaw: async (user) => {
		const reporterms = await Reporterm.find({ user }).sort({ startDate: 1 });
		return {
			reporterms,
		};
	},
	getFileName: (user, extension) => {
		// Use the last 3 digits of the user ID to increase variance in file name
		const userfootprint = user.slice(-3);
		const fileName = `bayograff_${userfootprint}-${new Date().getTime()}.${extension}`;
		return fileName;
	},
};
