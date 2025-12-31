require("dotenv").config();
const app = require("./app");
const connectDB = require("./db");

connectDB();
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on ${process.env.PORT}`)
);
