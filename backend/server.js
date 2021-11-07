const express = require("express");
let { Server } = require("socket.io");
const app = express();
const cors = require("cors");

// game function which handles the main logic
let { gameSetup } = require("./services/GameSetup");

let { Lobby } = require("./services/Lobby");
let { Scorecards } = require("./services/ScoreCards");
let { trackScores } = require("./services/Score-Checking");
let { questions } = require("./services/Questions/questions");
let { ConnectionToDatabase } = require("./utils/Connection");

let lobbies = new Lobby();
let scorecards = new Scorecards();
let database = new ConnectionToDatabase();

const port = 5000;

app.use(cors());
app.use(express.json());
// creating an express server instance
let server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// route which provides the games which are in progress or
// which took place in the current session
app.get("/scores", (req, res) => {
  try {
    let allScoreCards = scorecards.findAllScores();
    res.status(200).json({ scores: allScoreCards });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// router which provides the history of all the games
// which were played since connection with database
app.get("/history", async (req, res) => {
  try {
    let history = await database.showHistory();
    res.status(200).json({ history: history.reverse() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// Server constructor for sockets
const io = new Server(server, { cors: { origin: "*" } });

//initializing the socket io connection
io.on("connection", (socket) => {
  // when a player joins a Lobby
  socket.on("join-game", ({ playerName }) => {
    gameSetup(socket, lobbies, playerName, io, scorecards, database);
  });

  // For each answer from the player
  socket.on("answer", ({ playerId, roomId, questionId, selectedChoice }) => {
    console.log(playerId, roomId, questionId, selectedChoice);
    trackScores(scorecards, playerId, roomId, questionId, selectedChoice);
  });

  // When a player disconnects
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
