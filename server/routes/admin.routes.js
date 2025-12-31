const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const c = require("../controllers/admin.controller");

// All admin routes require authentication and admin role
router.get("/users", auth, role("admin"), c.getAllUsers);
router.get("/plans", auth, role("admin"), c.getAllPlans);
router.get("/stats", auth, role("admin"), c.getDashboardStats);

module.exports = router;

