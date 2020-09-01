const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const reporterms = require("./routes/api/reporterms");

app.use("/api/reporterms", reporterms);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Bayograff Express server listening on port ${port}`))