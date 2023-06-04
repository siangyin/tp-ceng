const pool = require("../database/connectSql2");

// CREATE REVIEW
const createReview = async (req, res) => {
	try {
		// reviewId, restaurantId, userId, title, comment, rating, status, createdOn
		const { restaurantId, userId, comment, rating, photos } = req.body;
		let msg = [];
		let sql = "";
		let sqlVal = [];

		if (restaurantId && userId && comment && rating) {
			// insert new review
			// E.G. INSERT INTO Restaurant_Review (restaurantId, userId, title, comment, rating, status default draft )
			sql = `insert into Restaurant_Review (restaurantId, userId, title, comment, rating) values (?, ? ,?, ? ,?)`;
			sqlVal = [restaurantId, userId, req.body.title ?? null, comment, rating];

			let [row] = await pool.query(sql, sqlVal);

			if (!row.insertId) {
				msg.push(`Review insertion failed`);
			} else {
				const reviewId = row.insertId;
				if (reviewId) {
					if (photos) {
						// insert Restaurant_Photo
						// E.G. INSERT INTO Restaurant_Photo (restaurantId, reviewId, photoUrl, defaultPhoto, addedBy)

						for (const item of photos) {
							sql = `insert into Restaurant_Photo (restaurantId, reviewId, photoUrl, defaultPhoto, addedBy) values (?, ? ,?, ? ,?)`;
							sqlVal = [restaurantId, reviewId, item, false, userId];
							const [row2] = await pool.query(sql, sqlVal);
							!row2.insertId && msg.push(`photo ${item} insertion failed`);
						}
					}

					// change restaurant status from draft to active
					sql = "update Restaurant_Review set status = ? where reviewId = ?";
					[row] = await pool.query(sql, ["active", reviewId]);

					return res.status(200).json({
						status: "OK",
						msg: `Review added ${reviewId}`,
					});
				}
			}
		}

		res.status(400).json({
			status: "Invalid request",
			msg: "Invalid request",
			hasError: msg,
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

// GET ALL REVIEWS by query restaurantId or userId
const getAllReviews = async (req, res) => {
	try {
		res.status(200).json({
			status: "OK",
			data: data,
		});

		res.status(404).json({
			status: "Not found",
			msg: "No data found",
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

// GET A REVIEW by reviewId
const getReview = async (req, res) => {
	try {
		res.status(200).json({
			status: "OK",
			data: data,
		});

		res.status(404).json({
			status: "Not found",
			msg: "No data found",
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

// UPDATE A REVIEW by reviewId (user ownself, or admin)
const updateReview = async (req, res) => {
	try {
		res.status(200).json({
			status: "OK",
			data: data,
		});

		res.status(404).json({
			status: "Not found",
			msg: "No data found",
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

// DELETE A REVIEW by reviewId (user ownself, or admin)
const deleteReview = async (req, res) => {
	try {
		res.status(200).json({
			status: "OK",
			data: data,
		});

		res.status(404).json({
			status: "Not found",
			msg: "No data found",
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

module.exports = {
	createReview,
	getAllReviews,
	getReview,
	updateReview,
	deleteReview,
};
