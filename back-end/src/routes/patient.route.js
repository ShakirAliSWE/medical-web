const express = require("express");
const router = express.Router();
const { errorRoute404 } = require("../controllers/error.controller");

const {
  addRequestConsultation,
  expiredConsultation,
  lastConsultation,
  pastConsultations,
} = require("../controllers/patient.controller");

router.post("/add-request-consultation", addRequestConsultation);
router.post("/expired-consultation", expiredConsultation);
router.post("/last-consultation", lastConsultation);
router.post("/past-consultations", pastConsultations);

router.get("*", errorRoute404).post("*", errorRoute404);

module.exports = router;
