require("dotenv").config();
const mongoose = require("mongoose");
const Plan = require("../models/Plan");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Plan.deleteMany();
  await Plan.insertMany([
    {
      name: "Basic",
      price: 9.99,
      duration: 30,
      features: [
        "1 User Account",
        "Basic Support",
        "10GB Storage",
        "Email Support"
      ]
    },
    {
      name: "Pro",
      price: 29.99,
      duration: 30,
      features: [
        "5 User Accounts",
        "Priority Support",
        "100GB Storage",
        "24/7 Email & Chat Support",
        "Advanced Analytics"
      ]
    },
    {
      name: "Business",
      price: 79.99,
      duration: 30,
      features: [
        "20 User Accounts",
        "Dedicated Support Manager",
        "500GB Storage",
        "24/7 Phone Support",
        "Advanced Analytics",
        "Custom Integrations"
      ]
    },
    {
      name: "Enterprise",
      price: 199.99,
      duration: 30,
      features: [
        "Unlimited User Accounts",
        "Dedicated Account Manager",
        "Unlimited Storage",
        "24/7 Priority Support",
        "Advanced Analytics & Reporting",
        "Custom Integrations",
        "SLA Guarantee",
        "On-site Training"
      ]
    }
  ]);
  console.log("✅ Plans seeded");
  process.exit();
});
