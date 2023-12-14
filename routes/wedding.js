const express = require("express");
const router = express.Router();
const Registrant = require("../models/wedding/registrant");

router.get("/", async (req, res) => {
  try {
    const registrants = await Registrant.find();
    res.json(registrants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

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
