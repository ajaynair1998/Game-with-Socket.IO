const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  roomId: String,
  playerOne: mongoose.SchemaTypes.Mixed,
  playerTwo: mongoose.SchemaTypes.Mixed,
  pointsPlayerOne: Number,
  pointsPlayerTwo: Number,
  winner: String,
  loser: String,
});

let Game = mongoose.model("game", schema);

module.exports = { Game };
