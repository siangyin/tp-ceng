const express = require("express");
const router = express.Router();

const {
	getRestaurantsList,
	createRestaurant,
	getRestaurantDetail,
	updateRestaurant,
} = require("../controllers/restaurantController");

// router.route("/:id").patch(middleware, controller);

router.route("/").get(getRestaurantsList).post(createRestaurant);

router.route("/:id").get(getRestaurantDetail).patch(updateRestaurant);

module.exports = router;
