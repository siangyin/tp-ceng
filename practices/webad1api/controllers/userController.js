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
			status: "Not found",
			msg: "No data found",
		});
	} catch (error) {
		res.status(500).json({
			status: "Something went wrong, please try again",
			msg: error,
		});
	}
};
// UPDATE USER DETAIL
const updateUser = async (req, res) => {
	try {
		const { userId } = req.params;

		let sqlVal = [];
		let sql = "";

		for (const prop in req.body) {
			sql += `, ${prop} = ?`;
			sqlVal.push(req.body[prop]);
		}

		sqlVal.push(userId);

		sql = `update users set ${sql.replace(",", "")} where userId = ?`;
		const [row] = await pool.query(sql, [...sqlVal, userId]);

		if (row.affectedRows) {
			return res.status(200).json({
				status: "OK",
				msg: "user detail updated",
				data: row,
			});
		}

		res.status(400).json({
			status: "Invalid request",
			msg: "Invalid request",
		});
	} catch (error) {
		res.status(500).json({
			status: "Something went wrong, please try again",
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
			msg: "Request failed",
		});
	} catch (error) {
		res.status(500).json({
			status: "Something went wrong, please try again",
			msg: error,
		});
	}
};

module.exports = {
	getUsers,
	updateUser,
	resetPassword,
};
