const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  'player-mode': {
    type: String,
    required: true
  },
  'rounds-input': {
    type: Number,
    required: true,
  },
  'guesses-input': {
    type: Number,
    required: true,
  },
  'max-range': {
    type: Number,
    required: true,
  },
  'max-columns': {
    type: Number,
    required: true,
  },
  'max-time': {
    type: Number,
    required: true,
  },
  'score': {
    type: Object,
  },
  'user-name': {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Game", GameSchema);
