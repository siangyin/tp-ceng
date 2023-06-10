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

			let [restRow] = await pool.query(sql, sqlVal);

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
					// insert Restaurant_Photo
					// E.G. INSERT INTO Restaurant_Photo (restaurantId, photoUrl, defaultPhoto, createdOn, addedBy)

					for (const item of photos) {
						sql = `insert into Restaurant_Photo (restaurantId, photoUrl, defaultPhoto) values (?, ? ,?)`;
						sqlVal = [
							restaurant.restaurantId,
							item.photoUrl,
							item.defaultPhoto ?? false,
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

			// change restaurant status from draft to active
			sql = "update restaurants set status = ? where restaurantId = ?";
			[restRow] = await pool.query(sql, ["active", restaurant.restaurantId]);

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

// GET RESTAURANT
const getRestaurantDetail = async (req, res) => {
	try {
		const { id } = req.params;
		const data = {};
		const relatedTables = {
			restaurant: "restaurants",
			categories: "Restaurant_Category_Type",
			openHrs: "Opening_Hours",
			photos: "Restaurant_Photo",
			promotions: "Promotions",
			reviews: "Restaurant_Review",
		};

		for (const propKey in relatedTables) {
			let [row] = await pool.query(
				`select * from ${relatedTables[propKey]} where restaurantId = ?`,
				[id]
			);
			data[propKey] = row ?? null;
		}

		return res.status(200).json({
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

// GET RESTAURANTS LISTING
const getRestaurantsList = async (req, res) => {
	try {
		const data = [];
		const [list] = await pool.query("select * from restaurants");

		if (list.length > 0) {
			for (const restObj of list) {
				const alldb = {
					restaurantId: restObj.restaurantId,
					name: restObj.name,
					area: restObj.area,
					reviews: 0,
					avgRating: null,
					status: restObj.status,
					photo: null,
					type: [],
					cuisine: [],
				};

				let [row] = await pool.query(
					`select AVG(rating) as avg, count(*) as counts FROM Restaurant_Review WHERE restaurantId = ?`,
					[restObj.restaurantId]
				);
				alldb["reviews"] = Number.parseInt(row[0].counts);
				alldb["avgRating"] = +parseFloat(row[0].avg).toFixed(1) ?? null;

				// get Restaurant_Category_Type
				[row] = await pool.query(
					`select * from Restaurant_Category_Type where restaurantId = ?`,
					[restObj.restaurantId]
				);
				if (row.length > 0) {
					row.forEach((item) => {
						if (item.categoryType == "Cuisine") {
							alldb.cuisine.push(item.typeName);
						} else {
							alldb.type.push(item.typeName);
						}
					});
				}
				//  get Restaurant_Photo
				[row] = await pool.query(
					`select * from Restaurant_Photo where restaurantId = ? and defaultPhoto =?`,
					[restObj.restaurantId, true]
				);
				alldb.photo = row[0].photoUrl ?? null;

				data.push(alldb);
			}
			return res.status(200).json({
				status: "OK",
				count: data.length,
				data: data,
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
