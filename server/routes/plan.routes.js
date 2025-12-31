const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const c = require("../controllers/plan.controller");

// Public routes - specific routes first
router.get("/", c.getPlans);

// Admin only routes - POST before parameterized routes
router.post("/", auth, role("admin"), c.createPlan);

// Parameterized routes - after specific routes
router.get("/:id", c.getPlanById);
router.put("/:id", auth, role("admin"), c.updatePlan);
router.delete("/:id", auth, role("admin"), c.deletePlan);

module.exports = router;
