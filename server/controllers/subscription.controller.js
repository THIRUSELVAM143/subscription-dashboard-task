const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

exports.subscribe = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Check if user already has an active subscription
    const existingSub = await Subscription.findOne({
      user_id: req.user.id,
      status: "active"
    });

    if (existingSub && new Date(existingSub.end_date) > new Date()) {
      return res.status(400).json({ 
        message: "You already have an active subscription" 
      });
    }

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + plan.duration);

    // Deactivate old subscriptions
    await Subscription.updateMany(
      { user_id: req.user.id },
      { status: "expired" }
    );

    const subscription = await Subscription.create({
      user_id: req.user.id,
      plan_id: plan._id,
      start_date: start,
      end_date: end,
      status: "active"
    });

    const populatedSub = await Subscription.findById(subscription._id)
      .populate("plan_id");

    res.json({ 
      message: "Subscribed successfully",
      subscription: populatedSub
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.mySubscription = async (req, res) => {
  try {
    const sub = await Subscription.findOne({ 
      user_id: req.user.id,
      status: "active"
    })
      .populate("plan_id")
      .sort({ createdAt: -1 });

    if (!sub) {
      return res.json({ 
        subscription: null,
        message: "No active subscription found" 
      });
    }

    // Check if subscription is expired
    if (new Date(sub.end_date) < new Date()) {
      await Subscription.findByIdAndUpdate(sub._id, { status: "expired" });
      return res.json({ 
        subscription: null,
        message: "Your subscription has expired" 
      });
    }

    res.json({ subscription: sub });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.allSubscriptions = async (req, res) => {
  // console.log(req);
  try {
    const subscriptions = await Subscription.find()
      .populate("user_id", "name email")
      .populate("plan_id")
      .sort({ createdAt: -1 });
    
    res.json({ subscriptions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
