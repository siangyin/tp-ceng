const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
	host: "localhost",
	user: "SiangYin",
	password: "",
	database: "webapp",
});

connection.connect((err) => {
	console.log(err);
	if (err) {
		console.log(err.message);
		process.exit(1);
	}
	console.log("db " + connection.state);
});
