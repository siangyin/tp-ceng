const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./dbService");
app.use(cors()); // to be able to send data to backend
app.use(express.json()); // able to ssend json format
app.use(express.urlencoded({ extended: false })); // false wont be sending any form data and if true will to parse the incoming request with urlencoded payloads and is based upon the body-parser.

app.post("/insert", (req, res) => {});

app.get("/getAll", (req, res) => {
	res.json({ success: true });
});

app.listen(process.env.PORT, () =>
	console.log(`app is running at ${process.env.PORT}`)
);
