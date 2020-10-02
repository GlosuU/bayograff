const express = require("express");
const path = require("path");
const { environment, port } = require("./config/config");
// const mongoose = require('mongoose')
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const reporterms = require("./routes/api/reporterms");
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

//// ROUTES
app.use("/api/reporterms", reporterms);
app.use("/api/export", exporter);

// Handle production
if (environment === "production") {
	// Static directory
	app.use(express.static(path.resolve(__dirname, "./public/dist")));

	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, "./public/dist/index.html")));
}

const server_port = port || 3000;
app.listen(server_port, () =>
	console.log(`Bayograff Express server running in ${environment} mode on port ${server_port}`)
);
