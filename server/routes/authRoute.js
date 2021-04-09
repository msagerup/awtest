const express = require("express");
const router = express.Router();

//!!- Putte inn eslint / prettier for å sikre code style.
const { steamLoginLink, steamAuth, authMe } = require('../controllers/auth')

router.route("/auth/steam").get(steamLoginLink);
router.route("/auth/steam/authenticate").get(steamAuth);
router.route("/auth/me").post(authMe);


module.exports = router