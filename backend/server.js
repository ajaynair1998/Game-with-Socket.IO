const express = require("express");
let { Server } = require("socket.io");
const app = express();
const cors = require("cors");

// game function which handles the main logic
let { gameSetup } = require("./libs/GameSetup");

let { Lobby } = require("./libs/Lobby");
let { Scorecards } = require("./libs/ScoreCards");
let { trackScores } = require("./libs/Score-Checking");
let { questions } = require("./libs/Questions/questions");
let { ConnectionToDatabase } = require("./models/Connection");

let lobbies = new Lobby();
let scorecards = new Scorecards();
let database = new ConnectionToDatabase();

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

app.get("/scores", (req, res) => {
  let allScoreCards = scorecards.findAllScores();
  res.status(200).json({ scores: allScoreCards });
});

const io = new Server(server, { cors: { origin: "*" } });

//initializing the socket io connection
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("id", ({ playerName }) => {
    // console.log(socket, "from id route", lobbies);
    gameSetup(socket, lobbies, playerName, io, scorecards, database);
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
