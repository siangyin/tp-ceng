const pool = require("../database/connectSql2");
const jwt = require("jsonwebtoken");
const findUsers = require("./userController");

const createJWT = (payload) =>
	(token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "30d",
	}));

const register = async (req, res) => {
	try {
		const { email, password, username } = req.body;

		// find users with same email
		const [users] = await pool.query("select * from users where email = ?", [
			email,
		]);
		// if found users with same email
		if (users.length) {
			return res
				.status(400)
				.json({ status: "Bad request", msg: "Email already exists" });
		} else {
			const sql =
				"insert into users (email, password, username) values (?, ?, ?)";
			const [user] = await pool.query(sql, [email, password, username]);
			// rows.insertedId is the created item id
			// new user registration success
			if (user.insertId) {
				const token = createJWT({
					userId: user.insertId,
					email,
					username,
					role: "user",
				});

				return res.status(201).json({
					status: "OK",
					msg: "user created successfully",
					token,
				});
			} else {
				// new user registration failed
				return res.status(406).json({
					status: "Request failed",
					msg: "error",
				});
			}
		}
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const [users] = await pool.query("select * from users where email = ?", [
			email,
		]);

		// found user with email & check if password matched
		if (users[0] && users[0].password === password) {
			const user = {
				userId: users[0].userId,
				email: users[0].email,
				username: users[0].username,
				role: users[0].role,
			};

			const token = createJWT(user);

			return res.status(200).json({
				status: "OK",
				data: user,
				token,
			});
		}

		return res.status(401).json({
			status: "Invalid credentials",
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

module.exports = {
	register,
	login,
};
