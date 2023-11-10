const home = require("../controllers/home");

const express = require("express");
const router = express.Router();
router.get("/", home);

module.exports = router;
