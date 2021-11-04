class Scorecards {
  constructor() {
    //   stores each roomid and its corresponding rooms
    this.scores = {};
  }

  startTakingScores(room) {
    this.scores[room.roomId] = room;
  }

  addScoreToPlayer(roomId, playerId) {
    let selectedRoom = this.scores[roomId];

    if (selectedRoom.playerOne.id === playerId) {
      selectedRoom.pointsPlayerOne = selectedRoom.pointsPlayerOne + 1;
    } else {
      selectedRoom.pointsPlayerTwo = selectedRoom.pointsPlayerTwo + 1;
    }
  }

  findTheWinner(roomId) {
    let selectedRoom = this.scores[roomId];

    if (selectedRoom.pointsPlayerOne > selectedRoom.pointsPlayerTwo) {
      return {
        winner: selectedRoom.playerOne.id,
        loser: selectedRoom.playerTwo.id,
      };
    } else if (selectedRoom.pointsPlayerOne < selectedRoom.pointsPlayerTwo) {
      return {
        loser: selectedRoom.playerOne.id,
        winner: selectedRoom.playerTwo.id,
      };
    } else {
      return {
        loser: selectedRoom.playerOne.id,
        winner: selectedRoom.playerTwo.id,
        draw: true,
      };
    }
  }
}

module.exports = { Scorecards };
