const { Router } = require("express");
const passport = require("passport");
const User = require("../database/models/User");
const { hashPassword } = require("../utils/helpers");

const router = Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged in");
  res.sendStatus(200);
});

// Routes below are password protected
router.use((req, res, next) => {
  if (req.user) next();
  else res.sendStatus(401);
});

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDB = await User.findOne({ username });
  if (userDB) {
    res.status(400).send({ message: "User already exists." });
  } else {
    const hashedPassword = hashPassword(password);
    await User.create({ username, password: hashedPassword });
    res.sendStatus(201);
  }
});

module.exports = router;
