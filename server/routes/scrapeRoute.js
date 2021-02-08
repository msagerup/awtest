const express = require("express");
const router = express.Router();

const {scrapeSteam} = require('../controllers/scrape')
router.route("/steam").get(scrapeSteam);

module.exports = router