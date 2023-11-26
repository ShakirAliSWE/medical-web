const express = require("express");
const router = express.Router();
const { errorRoute404 } = require("../controllers/error.controller");

router.use("/doctors", require("./doctor.route"));
router.use("/patients", require("./patient.route"));

router.get("*", errorRoute404).post("*", errorRoute404);

module.exports = router;
