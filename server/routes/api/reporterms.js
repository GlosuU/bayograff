const express = require("express");
const mongodb = require("mongodb");

if (process.env.NODE_ENV === "development") {
	const dotenv = require("dotenv");
	dotenv.config();
}

const router = express.Router();
const db_url =
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
	`@${process.env.DB_CLUSTER}.2bhrc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

async function loadReportermsCollection() {
	const client = await mongodb.MongoClient.connect(db_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client.db(process.env.DB_NAME).collection("reporterms");
}

// Get Reporterms
router.get("/", async (req, res) => {
	const reporterms = await loadReportermsCollection();
	if (req.query.search != null) {
		res.send(
			await reporterms
				.find({
					$or: [
						{ title: { $regex: req.query.search, $options: "i" } },
						{ content: { $regex: req.query.search, $options: "i" } },
					],
				})
				.toArray()
		);
	} else {
		res.send(await reporterms.find({}).toArray());
	}
});

// Get single Reporterm
router.get("/:id/", async (req, res) => {
	const reporterms = await loadReportermsCollection();
	res.send(await reporterms.findOne({ _id: new mongodb.ObjectID(req.params.id) }));
});

// Add Reporterm
router.post("/", async (req, res) => {
	const reporterms = await loadReportermsCollection();
	await reporterms.insertOne({
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		title: req.body.title,
		content: req.body.content,
		image: "https://dapp.dblog.org/img/default.jpg",
		createdAt: new Date(),
		updatedAt: new Date(),
	});
	res.status(201).send();
});

// Update Reporterm
router.put("/:id/", async (req, res) => {
	const reporterms = await loadReportermsCollection();
	await reporterms.updateOne(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{
			$set: {
				startDate: req.body.startDate,
				endDate: req.body.endDate,
				title: req.body.title,
				content: req.body.content,
				image:
					"https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search-v2_297x176.jpg",
				updatedAt: new Date(),
			},
		}
	);
	res.status(200).send();
});

// Delete Reporterm
router.delete("/:id/", async (req, res) => {
	const reporterms = await loadReportermsCollection();
	await reporterms.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(200).send();
});

module.exports = router;
