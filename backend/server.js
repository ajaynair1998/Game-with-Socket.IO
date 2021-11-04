const express = require("express");
let { Server } = require("socket.io");
const app = express();
const cors = require("cors");

// game function which handles the main logic
let { gameSetup, Rooms } = require("./libs/Game/game");
let { Lobby } = require("./libs/Game/Lobby");
let { Scorecards } = require("./libs/ScoreCards/scorecards");

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

  //for a new user joining the room
  socket.on("joinRoom", ({ username, roomname }) => {
    //* create user
    console.log(username, roomname);
    const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(p_user.room);

    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `Welcome ${p_user.username}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `${p_user.username} has joined the chat`,
    });
  });

  socket.on("id", ({ playerName }) => {
    // console.log(socket, "from id route", lobbies);
    gameSetup(socket, lobbies, rooms, playerName, io, scorecards);
  });

  // each answer from the player comes in
  socket.on("answer", ({ playerId, roomId, questionId, selectedChoice }) => {
    console.log(playerId, roomId, questionId, selectedChoice);
  });
  // setInterval(() => socket.emit("data", { count: "counting" }), 1000);
  // socket.emit("data", { data: "hello from server" });
  //when the user exits the room
  socket.on("disconnect", () => {
    // //the user is deleted from array of users and a left room message displayed
    // const p_user = user_Disconnect(socket.id);
    console.log("disconnected");
    // if (p_user) {
    //   io.to(p_user.room).emit("message", {
    //     userId: p_user.id,
    //     username: p_user.username,
    //     text: `${p_user.username} has left the room`,  `
    //   });
    // }
  });
});
