const express = require("express");
const router = express.Router();
const {
  createReservation,
  cancelReservation,
} = require("../controllers/reservationController");
const { getSummary } = require("../controllers/eventController");

router.post("/", createReservation);             // POST /reservations
router.delete("/:reservationId", cancelReservation); // DELETE /reservations/:id
router.get("/", getSummary);                    // GET /reservations (summary)

module.exports = router;
