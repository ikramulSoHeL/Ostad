const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

require("dotenv").config();
require("./config/database");

const folderRoutes = require("./routes/folder.routes");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use("/api/folder", folderRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use((err, res, req, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: err.message,
    error: err,
  });
});

module.exports = app;
