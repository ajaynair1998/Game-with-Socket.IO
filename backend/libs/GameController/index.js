let { countDown } = require("../Timer");

// Controls a single game instance
async function game(io, room, scorecards) {
  // add this room to scoreCards
  scorecards.startTakingScores(room);

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
  console.log(scorecards);
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

  let gameInfo = scorecards.findTheWinner(room.roomId);

  io.to(room.playerOne.id).to(room.playerTwo.id).emit("game", {
    roomId: room.roomId,
    state: "stop",
    info: gameInfo,
  });
}

module.exports = { game };
