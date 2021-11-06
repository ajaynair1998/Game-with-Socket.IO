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
      selectedRoom.pointsPlayerOne = selectedRoom.pointsPlayerOne + 10;
    } else {
      selectedRoom.pointsPlayerTwo = selectedRoom.pointsPlayerTwo + 10;
    }
  }

  findTheWinner(roomId) {
    let selectedRoom = this.scores[roomId];

    if (selectedRoom.pointsPlayerOne > selectedRoom.pointsPlayerTwo) {
      selectedRoom.winner = selectedRoom.playerOne.name;
      return {
        winner: selectedRoom.playerOne.id,
        loser: selectedRoom.playerTwo.id,
      };
    } else if (selectedRoom.pointsPlayerOne < selectedRoom.pointsPlayerTwo) {
      selectedRoom.winner = selectedRoom.playerTwo.name;
      return {
        loser: selectedRoom.playerOne.id,
        winner: selectedRoom.playerTwo.id,
      };
    } else {
      selectedRoom.draw = true;
      return {
        loser: selectedRoom.playerOne.id,
        winner: selectedRoom.playerTwo.id,
        draw: true,
      };
    }
  }

  findAllScores() {
    let roomsCurrentlyInPlay = Object.keys(this.scores);
    let roomDetails = [];

    for (let key of roomsCurrentlyInPlay) {
      roomDetails.push(this.scores[key]);
    }

    return roomDetails;
  }
}

module.exports = { Scorecards };
