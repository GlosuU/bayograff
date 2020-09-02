const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const reporterms = require("./routes/api/reporterms");

app.use("/api/reporterms", reporterms);

// Handle production
if (process.env.NODE_ENV === "production") {
	// Static directory
	app.use(express.static(path.resolve(__dirname, "../client/dist")));

	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, "../client/dist/index.html")));
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Bayograff Express server listening on port ${port}`));
