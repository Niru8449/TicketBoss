const Event = require("../models/event");

exports.seedEvent = async () => {
  const existing = await Event.findOne({ eventId: "node-meetup-2025" });
  if (!existing) {
    await Event.create({
      eventId: "node-meetup-2025",
      name: "Node.js Meet-up",
      totalSeats: 500,
      availableSeats: 500,
      version: 0,
    });
    console.log("✅ Event seeded successfully");
  } else {
    console.log("ℹ️ Event already exists");
  }
};

exports.getSummary = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: "node-meetup-2025" });
    if (!event) return res.status(404).json({ error: "Event not found" });

    const reservationCount = 500 - event.availableSeats;

    res.status(200).json({
      eventId: event.eventId,
      name: event.name,
      totalSeats: event.totalSeats,
      availableSeats: event.availableSeats,
      reservationCount,
      version: event.version,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
