const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/plans", require("./routes/plan.routes"));
app.use("/api", require("./routes/subscription.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/products", require("./routes/Product.routs"));

module.exports = app;
