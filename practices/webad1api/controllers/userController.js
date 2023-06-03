const pool = require("../database/connectSql2");

// GET USERS DETAIL
const getUsers = async (req, res) => {
	try {
		const { userId } = req.params;

		const [user] = await pool.query("select * from users where userId = ?", [
			userId,
		]);

		if (user[0] && user[0].role === "admin") {
			const [users] = await pool.query("select * from users");
			if (users.length) {
				console.log(user, users); //console
				return res.status(200).json({
					status: "OK",
					data: users,
				});
			}
		} else if (user[0]) {
			return res.status(200).json({
				status: "OK",
				data: user,
			});
		}

		res.status(404).json({
			status: "No data",
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};
// UPDATE USER DETAIL
const updateUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const values = [];
		let txt = "";
		for (const prop in req.body) {
			txt += `, ${prop} = ?`;
			values.push(req.body[prop]);
		}
		values.push(userId);
		let data;
		const sql = `update users set ${txt.replace(",", "")} where userId = ?`;
		const [row] = await pool.query(sql, [...values, userId]);

		if (row.affectedRows) {
			return res.status(200).json({
				status: "OK",
				data: row,
			});
		}

		res.status(400).json({
			status: "Invalid request",
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};
// RESET PASSWORD
const resetPassword = async (req, res) => {
	try {
		const { email } = req.query;

		if (email) {
			const [users] = await pool.query(
				"update users set password = ? where email = ?",
				[email, email]
			);
			return res.status(200).json({
				status: "OK",
				msg: "Request submitted",
			});
		}
		return res.status(400).json({
			status: "Bad request",
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

module.exports = {
	getUsers,
	updateUser,
	resetPassword,
};
