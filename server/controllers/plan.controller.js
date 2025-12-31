const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");
const { createPlanSchema, updatePlanSchema } = require("../validations/plan.validation");

exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createPlan = async (req, res) => {
  try {
    console.log("Create plan request body:", req.body);
    
    // Clean up features array - remove empty strings
    if (req.body.features && Array.isArray(req.body.features)) {
      req.body.features = req.body.features
        .map(f => typeof f === 'string' ? f.trim() : f)
        .filter(f => f && f !== "");
    } else if (!req.body.features) {
      req.body.features = [];
    }

    // Ensure price and duration are numbers
    if (typeof req.body.price === 'string') {
      req.body.price = parseFloat(req.body.price);
    }
    if (typeof req.body.duration === 'string') {
      req.body.duration = parseInt(req.body.duration);
    }

    const { error, value } = createPlanSchema.validate(req.body);
    if (error) {
      console.error("Validation error:", error);
      return res.status(400).json({ 
        message: error.details[0].message,
        details: error.details 
      });
    }

    const plan = await Plan.create(value);
    console.log("Plan created successfully:", plan);
    
    res.status(201).json({ 
      message: "Plan created successfully",
      plan 
    });
  } catch (error) {
    console.error("Create plan error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    // Clean up features array - remove empty strings
    if (req.body.features && Array.isArray(req.body.features)) {
      req.body.features = req.body.features.filter(f => f && f.trim() !== "");
    }

    const { error } = updatePlanSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: error.details[0].message,
        details: error.details 
      });
    }

    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ 
      message: "Plan updated successfully",
      plan 
    });
  } catch (error) {
    console.error("Update plan error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Check if plan has active subscriptions
    const activeSubscriptions = await Subscription.countDocuments({
      plan_id: req.params.id,
      status: "active"
    });

    if (activeSubscriptions > 0) {
      return res.status(400).json({ 
        message: `Cannot delete plan. It has ${activeSubscriptions} active subscription(s). Please deactivate subscriptions first.` 
      });
    }

    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
