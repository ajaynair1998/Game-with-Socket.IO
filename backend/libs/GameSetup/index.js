let { Player } = require("../Player");
let { game } = require("../GameController");
let { Room } = require("../Room");

// main game function which controls the users and the game
function gameSetup(socket, lobbies, playerName, io, scorecards) {
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
    game(io, newRoom, scorecards);
  }
}

module.exports = { gameSetup };
