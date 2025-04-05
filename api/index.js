const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const db = require("./models"); // Central Sequelize and model access

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
app.use("/", authRoutes);
app.use("/", eventRoutes);

// Sync DB and start server
db.sequelize
  .sync()
  .then(() => {
    console.log("SQLite Database Connected & Synced");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Sync Error:", err);
  });
