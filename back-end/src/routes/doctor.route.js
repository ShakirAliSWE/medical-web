const express = require("express");
const router = express.Router();
const { errorRoute404 } = require("../controllers/error.controller");

const {
  consultationRequests,
  consultationAccepeted,
  consultationDeclined,
  consultationCompleted,
} = require("../controllers/doctors.controller");

router.post("/consultation-requests", consultationRequests);
router.post("/consultation-accepted", consultationAccepeted);
router.post("/consultation-declined", consultationDeclined);
router.post("/consultation-completed", consultationCompleted);

router.get("*", errorRoute404).post("*", errorRoute404);

module.exports = router;
