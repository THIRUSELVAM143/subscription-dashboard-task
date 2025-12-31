const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  start_date: Date,
  end_date: Date,
  status: { type: String, enum: ["active", "expired"], default: "active" }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
