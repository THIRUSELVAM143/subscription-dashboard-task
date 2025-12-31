const mongoose = require("mongoose");

module.exports = mongoose.model(
  "RefreshToken",
  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    token: String,
    expiresAt: Date
  })
);
