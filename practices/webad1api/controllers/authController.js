const pool = require("../database/connectSql2");
// const mysql = require("../database/connectDb");
// const bcrypt = require("bcrypt");

const register = async (req, res) => {
	try {
		const { email, password, username } = req.body;
		const [results] = await pool.query("select * from users where email = ?", [
			email,
		]);
		if (results[0])
			return res
				.status(400)
				.json({ status: "Bad request", msg: "Email already exists" });

		const sql =
			"insert into users (email, password, username) values (?, ?, ?)";
		const [rows, fields] = await pool.query(sql, [email, password, username]);

		if (rows.affectedRows) {
			return res
				.status(200)
				.json({ status: "OK", msg: "user created successfully" });
		} else {
			return res.json({
				msg: "error",
			});
		}
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const [results] = await pool.query("select * from users where email = ?", [
			email,
		]);
		if (results[0])
			return res.status(200).json({
				results: results,
			});
	} catch (error) {
		res.status(500).json({
			msg: error.message,
		});
	}
};

// unable to insert with mysql pkg
// const registerX = async (req, res) => {
// 	const { email, password, username } = req.body;

// 	let sqlCmd = `INSERT INTO Users (username, email, password) VALUES (?,?,?);'`;

// 	mysql.query(sqlCmd, [username, email, password], (err, result) => {
// 		if (err) {
// 			throw err;
// 		} else {
// 			res.status(200).json(result);
// 		}
// 	});
// };

// able to get users table with mysql pkg
// const login = async (req, res) => {
// 	let sqlCmd = "select * from users";

// 	mysql.query(sqlCmd, (err, result) => {
// 		if (err) {
// 			throw err;
// 		} else {
// 			res.status(200).json(result);
// 		}
// 	});
// };

module.exports = {
	register,
	login,
};
// login,
// logout,
// verifyEmail,
// resetPassword,
// forgotPassword,
