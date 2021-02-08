const express = require("express");
const router = express.Router();

const {steamLoginLink, steamAuth, authMe} = require('../controllers/auth')

router.route("/auth/steam").get(steamLoginLink);
router.route("/auth/steam/authenticate").get(steamAuth);
router.route("/auth/me").post(authMe);


module.exports = router