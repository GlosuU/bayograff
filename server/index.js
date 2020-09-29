const express = require("express");
const cors = require("cors");
const path = require("path");
const reporterms = require("./routes/api/reporterms");
const exporter = require("./routes/api/exporter");

const app = express();

//// MIDDLEWARES
app.use(express.json());
app.use(cors());

// Reporterms routes
app.use("/api/reporterms", reporterms);

// Exporter routes
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
	console.log(
		`Bayograff Express server in ${process.env.NODE_ENV} mode is listening on port ${port}`
	)
);
