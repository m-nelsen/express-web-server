const mongoose = require("mongoose");

const shortTextInputLength = 80;
const longTextInputLength = 500;

const guestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name."],
    maxlength: [
      shortTextInputLength,
      `Name cannot be more than ${shortTextInputLength} characters.`,
    ],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name."],
    maxlength: [
      shortTextInputLength,
      `Name cannot be more than ${shortTextInputLength} characters.`,
    ],
  },
  preferredEntree: {
    type: String,
    required: [true, "Please provide your preferred entree."],
    maxlength: [
      shortTextInputLength,
      `Entree cannot be more than ${shortTextInputLength} characters.`,
    ],
  },
  dietaryRestrictions: {
    type: String,
    required: [false],
    maxlength: [
      longTextInputLength,
      `Entree cannot be more than ${longTextInputLength} characters.`,
    ],
  },
});

const registrantSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name."],
    maxlength: [
      shortTextInputLength,
      `Name cannot be more than ${shortTextInputLength} characters.`,
    ],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name."],
    maxlength: [
      shortTextInputLength,
      `Name cannot be more than ${shortTextInputLength} characters.`,
    ],
  },
  attendanceStatus: {
    type: Boolean,
    required: [true, "Will you be attending?"],
  },
  preferredEntree: {
    type: String,
    required: [true, "Please provide your preferred entree."],
    maxlength: [
      shortTextInputLength,
      `Entree cannot be more than ${shortTextInputLength} characters.`,
    ],
  },
  dietaryRestrictions: {
    type: String,
    required: [false],
    maxlength: [
      longTextInputLength,
      `Entree cannot be more than ${longTextInputLength} characters.`,
    ],
  },
  guests: [guestSchema],
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("Registrant", registrantSchema);
