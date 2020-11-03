const express = require("express");
const { max_n_anecdaynotes } = require("../../config/config");
const checkJWT = require("../../middleware/auth");
const Anecdaynote = require("../../models/Anecdaynote");

const router = express.Router();

// @desc    Fetch a list of anecdaynotes belonging to user
// @query	Optional search (filter) parameter in query
// @query	Optional startDate + endDate parameters in query
// @route   GET /api/anecdaynotes
router.get("/", checkJWT, async (req, res) => {
	try {
		let anecdaynotes = [];
		if (req.query.search != null) {
			anecdaynotes = await Anecdaynote.find({
				user: req.user.sub,
				$or: [
					{ title: { $regex: req.query.search, $options: "i" } },
					{ content: { $regex: req.query.search, $options: "i" } },
				],
			}).sort({ date: 1 });
		} else if (req.query.startDate && req.query.endDate) {
			anecdaynotes = await Anecdaynote.find({
				user: req.user.sub,
				date: { $gte: req.query.startDate, $lte: req.query.endDate },
			}).sort({ date: 1 });
		} else {
			anecdaynotes = await Anecdaynote.find({
				user: req.user.sub,
			}).sort({ date: 1 });
		}
		return res.send(anecdaynotes);
	} catch (err) {
		// // console.error(err);
		return res.status(500).send();
	}
});

// @desc    Fetch a single anecdaynote
// @route   GET /api/anecdaynotes/:id
router.get("/:id", checkJWT, async (req, res) => {
	try {
		const anecdaynote = await Anecdaynote.findById(req.params.id);

		if (!anecdaynote) {
			// This anecdaynote does not exist in DB
			return res.status(404).send();
		}

		if (anecdaynote.user != req.user.sub) {
			// User does not own this anecdaynote
			return res.status(403).send();
		} else {
			return res.send(anecdaynote);
		}
	} catch (err) {
		// console.error(err);
		res.status(500).send();
	}
});

// @desc    Add a new anecdaynote
// @route   POST /api/anecdaynotes
router.post("/", checkJWT, async (req, res) => {
	try {
		let anecdaynotes = [];
		anecdaynotes = await Anecdaynote.find({
			user: req.user.sub,
		});

		if (anecdaynotes.length < max_n_anecdaynotes) {
			req.body.user = req.user.sub;
			await Anecdaynote.create(req.body);
			return res.status(201).send();
		} else {
			// console.error(`Maximum number of anecdaynotes exceeded for user: ${req.user.sub}`);
			return res
				.status(409)
				.send("Maximum number of anecdaynotes reached. Can't create new anecdaynote.");
		}
	} catch (err) {
		// console.error(err);
		return res.status(500).send();
	}
});

// @desc    Update an anecdaynote
// @route   PUT /api/anecdaynotes/:id
router.put("/:id", checkJWT, async (req, res) => {
	try {
		const anecdaynote = await Anecdaynote.findById(req.params.id);

		if (!anecdaynote) {
			// This anecdaynote does not exist in DB
			return res.status(404).send();
		}

		if (anecdaynote.user != req.user.sub) {
			// User does not own this anecdaynote
			return res.status(403).send();
		} else {
			req.body.updatedAt = new Date();
			await Anecdaynote.findOneAndUpdate({ _id: req.params.id }, req.body, {
				new: true,
				runValidators: true,
			});

			return res.status(200).send();
		}
	} catch (err) {
		// console.error(err);
		return res.status(500).send();
	}
});

// @desc    Delete an anecdaynote
// @route   DELETE /api/anecdaynotes/:id
router.delete("/:id", checkJWT, async (req, res) => {
	try {
		const anecdaynote = await Anecdaynote.findById(req.params.id);

		if (!anecdaynote) {
			// This anecdaynote does not exist in DB
			return res.status(404).send();
		}

		if (anecdaynote.user != req.user.sub) {
			// User does not own this anecdaynote
			return res.status(403).send();
		} else {
			await Anecdaynote.deleteOne({ _id: req.params.id });
			return res.status(200).send();
		}
	} catch (err) {
		// console.error(err);
		return res.status(500).send();
	}
});

// @desc    Fetch the total count of anecdaynotes of a user
// @route   GET /api/anecdaynotes/totalcount
router.get("/total/count", checkJWT, async (req, res) => {
	try {
		let anecdaynotes = [];
		anecdaynotes = await Anecdaynote.find({
			user: req.user.sub,
		});
		return res.send(anecdaynotes.length.toString());
	} catch (err) {
		// console.error(err);
		return res.status(500).send();
	}
});

module.exports = router;
