const express = require("express");
const router = express.Router();

router.get("/wedding", (req, res) => {
  router.use(express.static("projects/wedding/dist"));
  res.sendFile("projects/wedding/dist/index.html", { root: "./" });
});

router.get("/dev", (req, res) => {
  router.use(express.static("projects/portfolio/dist"));
  res.sendFile("projects/portfolio/dist/index.html", { root: "./" });
});

router.get("/admin", (req, res) => {
  router.use(express.static("projects/admin/dist"));
  res.sendFile("projects/admin/dist/index.html", { root: "./" });
});

router.get("/", (req, res) => {
  res.redirect("/wedding");
});

module.exports = router;
