class Room {
  constructor([playerOne, playerTwo]) {
    this.roomId = playerOne.id;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.pointsPlayerOne = 0;
    this.pointsPlayerTwo = 0;
    this.winner = null;
    this.loser = null;
  }

  addPointPlayerOne() {
    this.pointsPlayerOne += 1;
  }

  addPointPlayerTwo() {
    this.pointsPlayerTwo += 1;
  }
}

module.exports = { Room };
