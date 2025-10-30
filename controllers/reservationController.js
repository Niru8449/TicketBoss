const { randomUUID } = require("crypto");
const Event = require("../models/event");
const Reservation = require("../models/reservation");

exports.createReservation = async (req, res) => {
  try {
    const { partnerId, seats } = req.body;

    if (!partnerId || typeof seats !== "number")
      return res.status(400).json({ error: "Invalid input" });

    if (seats <= 0 || seats > 10)
      return res.status(400).json({ error: "Seats must be between 1 and 10" });

    let event = await Event.findOne({ eventId: "node-meetup-2025" });
    if (!event) return res.status(404).json({ error: "Event not found" });

// ✅ update only if enough seats left (no need to check version manually for now)
const updated = await Event.findOneAndUpdate(
  {
    eventId: "node-meetup-2025",
    availableSeats: { $gte: seats }
  },
  {
    $inc: { availableSeats: -seats, version: 1 }
  },
  { new: true }
);

    if (!updated)
      return res.status(409).json({ error: "Not enough seats left" });

    const reservation = await Reservation.create({
      reservationId: randomUUID(),
      partnerId,
      seats,
      eventId: event.eventId,
    });

    res.status(201).json({
      reservationId: reservation.reservationId,
      seats: reservation.seats,
      status: reservation.status,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findOne({ reservationId });

    if (!reservation || reservation.status === "cancelled")
      return res.status(404).json({ error: "Reservation not found or already cancelled" });

    const event = await Event.findOne({ eventId: reservation.eventId });
    if (!event) return res.status(404).json({ error: "Event not found" });

    // cancel reservation
    reservation.status = "cancelled";
    await reservation.save();

    // add seats back
    await Event.findOneAndUpdate(
      { eventId: event.eventId },
      { $inc: { availableSeats: reservation.seats, version: 1 } }
    );

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
