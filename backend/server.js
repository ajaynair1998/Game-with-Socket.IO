const express = require("express");
let { Server } = require("socket.io");
const app = express();
const cors = require("cors");

// game function which handles the main logic
let { gameSetup, Rooms } = require("./libs/Game/game");
let { Lobby } = require("./libs/Game/Lobby");
let { Scorecards } = require("./libs/ScoreCards/scorecards");
let { trackScores } = require("./libs/Score-Checking/Tracking-Scores");

let lobbies = new Lobby();
let rooms = new Rooms();
let scorecards = new Scorecards();

const port = 5000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

let server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const io = new Server(server, { cors: { origin: "*" } });

//initializing the socket io connection
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("id", ({ playerName }) => {
    // console.log(socket, "from id route", lobbies);
    gameSetup(socket, lobbies, rooms, playerName, io, scorecards);
  });

  // each answer from the player comes in
  socket.on("answer", ({ playerId, roomId, questionId, selectedChoice }) => {
    console.log(playerId, roomId, questionId, selectedChoice);
    trackScores(scorecards, playerId, roomId, questionId, selectedChoice);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
