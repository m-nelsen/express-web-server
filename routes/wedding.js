const express = require("express");
const Registrant = require("../database/models/Registrant");

const router = express.Router();

// Add a new wedding registrant
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      attendanceStatus,
      preferredEntree,
      dietaryRestrictions,
      guests = [],
    } = req.body;

    const newRegistrant = new Registrant({
      firstName,
      lastName,
      attendanceStatus,
      preferredEntree,
      dietaryRestrictions,
      guests,
    });

    await newRegistrant.save();

    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Routes below are password protected
// router.use((req, res, next) => {
//   if (req.user) next();
//   else res.sendStatus(401);
// });

// Get all wedding registrants
router.get("/", async (req, res) => {
  try {
    const registrants = await Registrant.find();
    res.json(registrants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a wedding registrant
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ success: false, message: "No valid id" });
    }

    const deletedRegistrant = await Registrant.deleteOne({ _id: id });
    if (!deletedRegistrant) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
