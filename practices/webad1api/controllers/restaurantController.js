const pool = require("../database/connectSql2");

// CREATE RESTAURANT
const createRestaurant = async (req, res) => {
	try {
		const { restaurant, categories, openHrs, photos, promotions } = req.body;
		let msg = [];

		if (restaurant && categories && openHrs) {
			// insert restaurant table
			let sqlVal = [];
			let sql = "";

			for (const prop in restaurant) {
				sql += `, ${prop} = ?`;
				sqlVal.push(restaurant[prop]);
			}

			sql = `insert restaurants set ${sql.replace(",", "")}`;

			const [restRow] = await pool.query(sql, sqlVal);

			if (!restRow.insertId) {
				msg.push("restaurant table insertion failed");
			} else {
				// Restaurant added success
				// get restaurantId
				restaurant.restaurantId = restRow.insertId;

				// insert Restaurant_Category_Types
				// E.G. INSERT INTO Restaurant_Category_Type (restaurantId, categoryType, typeName)
				// VALUES('..', '..', '..'), ('..', '..', '..'), ...

				// add f&b type
				for (const val of categories.type) {
					sql = `insert into Restaurant_Category_Type (restaurantId, categoryType, typeName) values (?, ? ,?)`;
					sqlVal = [restaurant.restaurantId, "Type", val];
					const [row] = await pool.query(sql, sqlVal);

					!row.affectedRows &&
						msg.push(`restaurant type ${val} insertion failed`);
				}
				// add cuisine
				for (const val of categories.cuisine) {
					sql = `insert into Restaurant_Category_Type (restaurantId, categoryType, typeName) values (?, ? ,?)`;
					sqlVal = [restaurant.restaurantId, "Cuisine", val];
					const [row] = await pool.query(sql, sqlVal);

					!row.affectedRows &&
						msg.push(`restaurant cuisine  ${val} insertion failed`);
				}

				// insert Opening_Hours
				// E.G. INSERT INTO Opening_Hours (restaurantId, dayOfWeek, valueText)

				for (const val of openHrs) {
					sql = `insert into Opening_Hours (restaurantId, dayOfWeek, valueText) values (?, ? ,?)`;
					sqlVal = [restaurant.restaurantId, val.dayOfWeek, val.valueText];
					const [row] = await pool.query(sql, sqlVal);
					!row.insertId &&
						msg.push(
							`opening hours ${(val.dayOfWeek, val.valueText)} insertion failed`
						);
				}

				if (photos) {
					// insert Opening_Hours
					// E.G. INSERT INTO Restaurant_Photo (restaurantId, photoUrl, defaultPhoto, createdOn, addedBy)

					for (const item of photos) {
						sql = `insert into Restaurant_Photo (restaurantId, photoUrl, defaultPhoto) values (?, ? ,?)`;
						sqlVal = [
							restaurant.restaurantId,
							item.photoUrl,
							item.defaultPhoto,
						];
						const [row] = await pool.query(sql, sqlVal);
						!row.insertId &&
							msg.push(`restaurant photo ${item.photoUrl} insertion failed`);
					}
				}

				if (promotions) {
					// insert Promotions
					// E.G. INSERT INTO Promotions (restaurantId, title, description, startDate, endDate) values ()

					for (const item of promotions) {
						sql = `insert into Promotions (restaurantId, title, description, startDate, endDate) values (?, ? ,?, ? ,?)`;
						sqlVal = [
							restaurant.restaurantId,
							item.title,
							item.description,
							item.startDate,
							item.endDate,
						];
						const [row] = await pool.query(sql, sqlVal);
						!row.insertId &&
							msg.push(`restaurant promotion ${item.title} insertion failed`);
					}
				}
			}

			return res.status(200).json({
				status: "OK",
				data: restaurant,
				hasError: msg,
			});
		}

		res.status(400).json({
			status: "Invalid request",
		});
	} catch (error) {
		res.status(500).json({
			status: "Something went wrong, please try again",
			msg: error,
		});
	}
};

// GET RESTAURANTS LISTING
const getRestaurantsList = async (req, res) => {
	try {
		const [rows] = await pool.query("select * from Category_Type");
		console.log(rows);
		res.status(200).json({
			status: "OK",
			msg: "Request submitted getRestaurantsList",
		});
	} catch (error) {
		res.status(500).json({
			status: "Something went wrong, please try again",
			msg: error,
		});
	}
};

// GET RESTAURANT
const getRestaurantDetail = async (req, res) => {
	try {
		const { id } = req.params;
		const data = {};

		// get restaurant
		const [row1] = await pool.query(
			"select * from restaurants where restaurantId = ?",
			[id]
		);
		data.restaurant = row1[0] ?? null;
		console.log(row1);
		// get category types
		const [row2] = await pool.query(
			"select * from Restaurant_Category_Type where restaurantId = ?",
			[id]
		);
		data.categories = row2[0] ?? null;
		console.log(row2);
		// get opening hours
		const [row3] = await pool.query(
			"select * from Opening_Hours where restaurantId = ?",
			[id]
		);
		data.openHrs = row3[0] ?? null;
		console.log(row3);
		// get photos
		const [row4] = await pool.query(
			"select * from Restaurant_Photo where restaurantId = ?",
			[id]
		);
		data.photos = row4[0] ?? null;
		console.log(row4);
		// get promotions
		const [row5] = await pool.query(
			"select * from Promotions where restaurantId = ?",
			[id]
		);
		data.promotions = row5[0] ?? null;
		console.log(row5);
		res.status(200).json({
			status: "OK",
			data: data,
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

// UPDATE RESTAURANT
const updateRestaurant = async (req, res) => {
	try {
		res.status(200).json({
			status: "OK",
			msg: "Request submitted updateRestaurant",
		});
	} catch (error) {
		res.status(500).json({
			status: "Server error",
			msg: error,
		});
	}
};

module.exports = {
	getRestaurantsList,
	createRestaurant,
	getRestaurantDetail,
	updateRestaurant,
};
