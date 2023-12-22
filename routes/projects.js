const express = require("express");
const router = express.Router();

router.get("/wedding", (req, res) => {
  router.use(express.static("projects/wedding/build"));
  res.sendFile("projects/wedding/build/index.html", { root: "./" });
});

router.get("/dev", (req, res) => {
  router.use(express.static("projects/portfolio/build"));
  res.sendFile("projects/portfolio/build/index.html", { root: "./" });
});

router.get("/", (req, res) => {
  res.redirect("/wedding");
});

module.exports = router;
