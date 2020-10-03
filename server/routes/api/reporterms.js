const express = require("express");
const checkJWT = require("../../middleware/auth");
const Reporterm = require("../../models/Reporterm");

const router = express.Router();

// @desc    Fetch a list of reporterms belonging to user
// @query	Optional search (filter) parameter in query
// @route   GET /api/reporterms
router.get("/", checkJWT, async (req, res) => {
	try {
		let reporterms;
		if (req.query.search != null) {
			reporterms = await Reporterm.find({
				user: req.user.sub,
				$or: [
					{ title: { $regex: req.query.search, $options: "i" } },
					{ content: { $regex: req.query.search, $options: "i" } },
				],
			});
		} else {
			reporterms = await Reporterm.find({
				user: req.user.sub,
			});
		}
		res.send(reporterms);
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// @desc    Fetch a single Reporterm
// @route   GET /api/reporterms/:id
router.get("/:id", checkJWT, async (req, res) => {
	try {
		const reporterm = await Reporterm.findById(req.params.id);

		if (!reporterm) {
			// This reporterm does not exist in DB
			return res.status(404).send();
		}

		if (reporterm.user != req.user.sub) {
			// User does not own this reporterm
			res.status(403).send();
		} else {
			res.send(reporterm);
		}
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// @desc    Add a new reporterm
// @route   POST /api/reporterms
router.post("/", checkJWT, async (req, res) => {
	try {
		req.body.user = req.user.sub;
		await Reporterm.create(req.body);
		res.status(201).send();
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// @desc    Update a reporterm
// @route   PUT /api/reporterms/:id
router.put("/:id", checkJWT, async (req, res) => {
	try {
		const reporterm = await Reporterm.findById(req.params.id);

		if (!reporterm) {
			// This reporterm does not exist in DB
			return res.status(404).send();
		}

		if (reporterm.user != req.user.sub) {
			// User does not own this reporterm
			res.status(403).send();
		} else {
			req.body.updatedAt = new Date();
			req.body.image =
				"https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search-v2_297x176.jpg";
			await Reporterm.findOneAndUpdate({ _id: req.params.id }, req.body, {
				new: true,
				runValidators: true,
			});

			res.status(200).send();
		}
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// @desc    Delete a reporterm
// @route   DELETE /api/reporterms/:id
router.delete("/:id", checkJWT, async (req, res) => {
	try {
		const reporterm = await Reporterm.findById(req.params.id);

		if (!reporterm) {
			// This reporterm does not exist in DB
			return res.status(404).send();
		}

		if (reporterm.user != req.user.sub) {
			// User does not own this reporterm
			res.status(403).send();
		} else {
			await Reporterm.deleteOne({ _id: req.params.id });
			res.status(200).send();
		}
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;

// const express = require("express");
// const mongodb = require("mongodb");
// const { db_name, db_url } = require("../../config/config");
// const checkJWT = require("../../middleware/auth");

// const router = express.Router();

// async function loadReportermsCollection() {
// 	const client = await mongodb.MongoClient.connect(db_url, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	});

// 	return client.db(db_name).collection("reporterms");
// }

// // Get Reporterms
// router.get("/", checkJWT, async (req, res) => {
// 	// console.log("req.user.sub", req.user.sub);
// 	const reporterms = await loadReportermsCollection();
// 	if (req.query.search != null) {
// 		res.send(
// 			await reporterms
// 				.find({
// 					$or: [
// 						{ title: { $regex: req.query.search, $options: "i" } },
// 						{ content: { $regex: req.query.search, $options: "i" } },
// 					],
// 				})
// 				.toArray()
// 		);
// 	} else {
// 		res.send(await reporterms.find({}).toArray());
// 	}
// });

// // Get single Reporterm
// router.get("/:id/", checkJWT, async (req, res) => {
// 	const reporterms = await loadReportermsCollection();
// 	res.send(await reporterms.findOne({ _id: new mongodb.ObjectID(req.params.id) }));
// });

// // Add Reporterm
// router.post("/", checkJWT, async (req, res) => {
// 	const reporterms = await loadReportermsCollection();
// 	await reporterms.insertOne({
// 		startDate: req.body.startDate,
// 		endDate: req.body.endDate,
// 		title: req.body.title,
// 		content: req.body.content,
// 		image: "https://dapp.dblog.org/img/default.jpg",
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	});
// 	res.status(201).send();
// });

// // Update Reporterm
// router.put("/:id/", checkJWT, async (req, res) => {
// 	const reporterms = await loadReportermsCollection();
// 	await reporterms.updateOne(
// 		{ _id: new mongodb.ObjectID(req.params.id) },
// 		{
// 			$set: {
// 				startDate: req.body.startDate,
// 				endDate: req.body.endDate,
// 				title: req.body.title,
// 				content: req.body.content,
// 				image:
// 					"https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search-v2_297x176.jpg",
// 				updatedAt: new Date(),
// 			},
// 		}
// 	);
// 	res.status(200).send();
// });

// // Delete Reporterm
// router.delete("/:id/", checkJWT, async (req, res) => {
// 	const reporterms = await loadReportermsCollection();
// 	await reporterms.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
// 	res.status(200).send();
// });

// module.exports = router;
