const express = require("express");
const path = require("path");
const { environment, port } = require("./config/config");
// const mongoose = require('mongoose')
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const reporterms = require("./routes/api/reporterms");
const anecdaynotes = require("./routes/api/anecdaynotes");
const factales = require("./routes/api/factales");
const exporter = require("./routes/api/exporter");

// Connect to DB
connectDB();

// Configure Express app
const app = express();

//// MIDDLEWARES
app.use(express.json());
app.use(cors());

// Logging in dev mode with Morgan
if (environment === "development") {
	app.use(morgan("dev"));
}

// Expose the public directory with static
app.use("/public", express.static(path.resolve(__dirname, "./public")));

//// ROUTES
app.use("/api/reporterms", reporterms);
app.use("/api/anecdaynotes", anecdaynotes);
app.use("/api/factales", factales);
app.use("/api/export", exporter);

// Handle production
if (environment === "production") {
	// Static directory
	app.use(express.static(path.resolve(__dirname, "./public/dist")));

	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, "./public/dist/index.html")));
}

app.listen(port, () =>
	console.log(`Bayograff Express server running in ${environment} mode on port ${port}`)
);
