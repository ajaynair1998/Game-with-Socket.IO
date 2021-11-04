let { countDown } = require("../Timer/timer");

// main game function which controls the users and the game
function gameSetup(socket, lobbies, rooms, playerName, io) {
  let lobbyToStartGameIn;
  let player = new Player(socket.id, playerName);
  if (!lobbies.isReadyToStart) {
    lobbies.addPlayer = player;
  }

  if (lobbies.isReadyToStart) {
    lobbyToStartGameIn = lobbies.startGame();
    let newRoom = new Room(lobbyToStartGameIn);
    console.log(lobbyToStartGameIn, "started ->", newRoom);
    // Start the game for the current Filled lobby
    game(io, newRoom);
  }
}

// Controls a single game instance
async function game(io, room) {
  // Send start message to the room on filled state
  io.to(room.playerOne.id)
    .to(room.playerTwo.id)
    .emit("game", {
      roomId: room.roomId,
      state: "start",
      questionNumber: 1,
      question: "Whats your age ?",
      answers: ["21", "22", "23"],
      questionId: "1",
    });

  await countDown(10);

  io.to(room.playerOne.id)
    .to(room.playerTwo.id)
    .emit("game", {
      roomId: room.roomId,
      state: "start",
      questionNumber: 2,
      question: "Whats your name ?",
      answers: ["ajay", "baba", "yaga"],
      questionId: "2",
    });

  await countDown(10);

  io.to(room.playerOne.id)
    .to(room.playerTwo.id)
    .emit("game", {
      roomId: room.roomId,
      state: "start",
      questionNumber: 3,
      question: "Whats your placfe ?",
      answers: ["alapuzha", "ekm", "someplace"],
      questionId: "3",
    });

  await countDown(10);

  io.to(room.playerOne.id)
    .to(room.playerTwo.id)
    .emit("game", {
      roomId: room.roomId,
      state: "start",
      questionNumber: 4,
      question: "Whats your color ?",
      answers: ["blue", "baba", "green"],
      questionId: "4",
    });

  await countDown(10);

  io.to(room.playerOne.id).to(room.playerTwo.id).emit("game", {
    roomId: room.roomId,
    state: "stop",
  });
}

// Class for storing the player info when recieving each socket connection
class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Rooms {
  constructor() {
    this.rooms = {};
  }
}

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

module.exports = { gameSetup, Rooms };
