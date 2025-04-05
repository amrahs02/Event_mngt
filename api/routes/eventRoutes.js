const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

const {
  deleteEvent,
  rsvpToEvent,
  getProfile,
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
} = require("../controllers/eventController");

// Event CRUD
router.post(
  "/events",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("date").isISO8601().withMessage("Invalid date format (YYYY-MM-DD)"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  createEvent
);
router.get("/events", getAllEvents);
router.get("/events/:id", authMiddleware, getEventById);
router.put("/events/:id", authMiddleware, updateEvent); 
router.delete("/events/:id", authMiddleware, deleteEvent);


// User profile
router.get("/profile", authMiddleware, getProfile);
// rsvp to event

router.post("/events/:id/rsvp", rsvpToEvent);

module.exports = router;
