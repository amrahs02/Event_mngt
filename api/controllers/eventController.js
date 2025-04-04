// const { Event } = require("../models/index"); // Adjust the path as needed
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const db = require("../models");
const Event = db.Event;
const User = db.User;

// Add new event
const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, date, location, description } = req.body;
    const event = await Event.create({ title, date, location, description });
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// View all events (with pagination and search)
const getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const events = await Event.findAndCountAll({
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      limit: parseInt(limit),
      offset,
    });

    res.json({ total: events.count, events: events.rows });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Edit event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.update(req.body);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
// Delete an event (protected)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.destroy();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get profile info
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// RSVP to an event (public)
const rsvpToEvent = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    let attendees = event.attendees || [];
    if (attendees.includes(email))
      return res.status(400).json({ error: "User already registered" });

    attendees.push(email);
    await event.update({ attendees });

    res.json({ message: "RSVP successful", event });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  createEvent,
  getEventById,
  getAllEvents,
  deleteEvent,
  updateEvent,

  rsvpToEvent,
  getProfile,
};
