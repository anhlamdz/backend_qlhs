const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const morgan = require("morgan");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 8797;
const db = mongoose.connection;

dotenv.config();

console.log("DB_URL:", process.env.DB_URL);

//connect db
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log("Không thể kết nối đến DB:", err));
db.on("error", (err) => {
  console.log("DB connection error:", err.message);
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", routes);
app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});

module.exports = app;
