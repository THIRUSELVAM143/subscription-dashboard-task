const User = require("../models/User");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all plans (admin only - can also use public endpoint)
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json({ plans });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get dashboard stats (admin only)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const totalSubscriptions = await Subscription.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: "active" });
    const expiredSubscriptions = await Subscription.countDocuments({ status: "expired" });

    res.json({
      stats: {
        totalUsers,
        totalPlans,
        totalSubscriptions,
        activeSubscriptions,
        expiredSubscriptions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

