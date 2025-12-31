const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const c = require("../controllers/subscription.controller");

router.post("/subscribe/:planId", auth, c.subscribe);
router.get("/my-subscription", auth, c.mySubscription);
router.get("/admin/subscriptions", auth, role("admin"), c.allSubscriptions);

module.exports = router;
