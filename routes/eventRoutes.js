const express = require("express");
const router = express.Router();
const { getSummary } = require("../controllers/eventController");

router.get("/", getSummary);

module.exports = router;
