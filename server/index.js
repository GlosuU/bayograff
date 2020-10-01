const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const reporterms = require("./routes/api/reporterms");
const exporter = require("./routes/api/exporter");

const app = express();

//// MIDDLEWARES
app.use(express.json());
app.use(cors());

// Logging in dev mode with Morgan
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

//// ROUTES
app.use("/api/reporterms", reporterms);
app.use("/api/export", exporter);

// Handle production
if (process.env.NODE_ENV === "production") {
	// Static directory
	app.use(express.static(path.resolve(__dirname, "./public/dist")));

	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, "./public/dist/index.html")));
}

const port = process.env.PORT || 3000;

app.listen(port, () =>
	console.log(`Bayograff Express server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
