const express = require("express");

const router = express.Router();

// @desc    Health check endpoint
// @route   GET /api/health
router.get("/", async (req, res) => {
    res.status(200).send(`{ "status": "UP" }`);
});

// @desc    Send the DB status
// @route   GET /api/health/db
router.get("/db", async (req, res) => {
    try {
        res.send(process.env.DB_INITIAL_CONNECTION);
    } catch (err) {
        // console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
