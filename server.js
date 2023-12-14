require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const weddingRoutes = require("./routes/wedding");

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Server started"));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/wedding", weddingRoutes);

app.get("/dev", (req, res) => {
  app.use(
    "/",
    express.static(path.join(__dirname, "projects/portfolio/build"))
  );
  res.sendFile(path.join(__dirname, "projects/portfolio/build/"));
});

app.get("/", (req, res) => {
  app.use("/", express.static(path.join(__dirname, "projects/wedding/build")));
  res.sendFile(path.join(__dirname, "projects/wedding/build/"));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
