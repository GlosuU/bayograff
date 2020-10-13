const Reporterm = require("../models/Reporterm");

module.exports = {
	getCollection: async (user) => {
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
