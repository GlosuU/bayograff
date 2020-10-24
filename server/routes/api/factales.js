const express = require("express");
const { max_n_factales } = require("../../config/config");
const checkJWT = require("../../middleware/auth");
const Factale = require("../../models/Factale");

const router = express.Router();

// @desc    Fetch a list of factales belonging to user
// @query	Optional search (filter) parameter in query
// @route   GET /api/factales
router.get("/", checkJWT, async (req, res) => {
	try {
		let factales = [];
		if (req.query.search != null) {
			factales = await Factale.find({
				user: req.user.sub,
				$or: [
					{ title: { $regex: req.query.search, $options: "i" } },
					{ content: { $regex: req.query.search, $options: "i" } },
				],
			}).sort({ title: 1 });
		} else {
			factales = await Factale.find({
				user: req.user.sub,
			}).sort({ title: 1 });
		}
		return res.send(factales);
	} catch (err) {
		console.error(err);
		return res.status(500).send();
	}
});

// @desc    Fetch a single factale
// @route   GET /api/factales/:id
router.get("/:id", checkJWT, async (req, res) => {
	try {
		const factale = await Factale.findById(req.params.id);

		if (!factale) {
			// This factale does not exist in DB
			return res.status(404).send();
		}

		if (factale.user != req.user.sub) {
			// User does not own this factale
			return res.status(403).send();
		} else {
			return res.send(factale);
		}
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// @desc    Add a new factale
// @route   POST /api/factales
router.post("/", checkJWT, async (req, res) => {
	try {
		let factales = [];
		factales = await Factale.find({
			user: req.user.sub,
		});

		if (factales.length < max_n_factales) {
			req.body.user = req.user.sub;
			await Factale.create(req.body);
			return res.status(201).send();
		} else {
			console.error(`Maximum number of factales exceeded for user: ${req.user.sub}`);
			return res
				.status(409)
				.send("Maximum number of factales reached. Can't create new factale.");
		}
	} catch (err) {
		console.error(err);
		return res.status(500).send();
	}
});

// @desc    Update a factale
// @route   PUT /api/factales/:id
router.put("/:id", checkJWT, async (req, res) => {
	try {
		const factale = await Factale.findById(req.params.id);

		if (!factale) {
			// This factale does not exist in DB
			return res.status(404).send();
		}

		if (factale.user != req.user.sub) {
			// User does not own this factale
			return res.status(403).send();
		} else {
			req.body.updatedAt = new Date();
			await Factale.findOneAndUpdate({ _id: req.params.id }, req.body, {
				new: true,
				runValidators: true,
			});

			return res.status(200).send();
		}
	} catch (err) {
		console.error(err);
		return res.status(500).send();
	}
});

// @desc    Delete a factale
// @route   DELETE /api/factales/:id
router.delete("/:id", checkJWT, async (req, res) => {
	try {
		const factale = await Factale.findById(req.params.id);

		if (!factale) {
			// This factale does not exist in DB
			return res.status(404).send();
		}

		if (factale.user != req.user.sub) {
			// User does not own this factale
			return res.status(403).send();
		} else {
			await Factale.deleteOne({ _id: req.params.id });
			return res.status(200).send();
		}
	} catch (err) {
		console.error(err);
		return res.status(500).send();
	}
});

// @desc    Fetch the total count of factales of a user
// @route   GET /api/factales/totalcount
router.get("/total/count", checkJWT, async (req, res) => {
	try {
		let factales = [];
		factales = await Factale.find({
			user: req.user.sub,
		});
		return res.send(factales.length.toString());
	} catch (err) {
		console.error(err);
		return res.status(500).send();
	}
});

module.exports = router;
