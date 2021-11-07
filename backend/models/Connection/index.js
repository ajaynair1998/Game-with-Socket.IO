const mongoose = require("mongoose");
const { Game } = require("../Game/index");
require("dotenv").config();

class ConnectionToDatabase {
  constructor() {
    try {
      this.connectionSuccessfull = mongoose.connect(process.env.MONGO_DB_URL);
    } catch (err) {
      console.log(err);
    }
  }

  async addGameToHistory(Room) {
    try {
      await this.connectionSuccessfull;

      let completedGame = new Game(Room);
      await completedGame.save();
      return true;
    } catch (err) {
      CompositionEvent.log(err);
    }
  }

  async showHistory() {
    try {
      await this.connectionSuccessfull;

      let history = await Game.find({});
      console.log(history);
      return history;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { ConnectionToDatabase };
