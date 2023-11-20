const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;