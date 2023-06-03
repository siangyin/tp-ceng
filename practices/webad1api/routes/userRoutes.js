const express = require("express");
const router = express.Router();

const {
	getUsers,
	updateUser,
	resetPassword,
} = require("../controllers/userController");

router.route("/resetpasswordFor").get(resetPassword);
router.route("/:userId").get(getUsers).patch(updateUser);

module.exports = router;
