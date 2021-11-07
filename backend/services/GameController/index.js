let { countDown } = require("../../utils/Timer");
let { questions } = require("../Questions/questions");

// Controls a single game instance
async function game(io, room, scorecards, database) {
  let shuffleFunction = questions();
  let questionsInShuffledOrder = shuffleFunction();

  // add this room to scoreCards
  scorecards.startTakingScores(room);

  // Send start message to the room on filled state
  io.to(room.playerOne.id).to(room.playerTwo.id).emit("game", {
    roomId: room.roomId,
    state: "start",
    questionNumber: 1,
    question: questionsInShuffledOrder[0].question,
    answers: questionsInShuffledOrder[0].choices,
    questionId: questionsInShuffledOrder[0].questionId,
  });
  console.log(scorecards);
  await countDown(10);

  io.to(room.playerOne.id).to(room.playerTwo.id).emit("game", {
    roomId: room.roomId,
    state: "start",
    questionNumber: 2,
    question: questionsInShuffledOrder[1].question,
    answers: questionsInShuffledOrder[1].choices,
    questionId: questionsInShuffledOrder[1].questionId,
  });

  await countDown(10);

  io.to(room.playerOne.id).to(room.playerTwo.id).emit("game", {
    roomId: room.roomId,
    state: "start",
    questionNumber: 3,
    question: questionsInShuffledOrder[2].question,
    answers: questionsInShuffledOrder[2].choices,
    questionId: questionsInShuffledOrder[2].questionId,
  });

  await countDown(10);

  io.to(room.playerOne.id).to(room.playerTwo.id).emit("game", {
    roomId: room.roomId,
    state: "start",
    questionNumber: 4,
    question: questionsInShuffledOrder[3].question,
    answers: questionsInShuffledOrder[3].choices,
    questionId: questionsInShuffledOrder[3].questionId,
  });

  await countDown(10);

  io.to(room.playerOne.id).to(room.playerTwo.id).emit("game", {
    roomId: room.roomId,
    state: "start",
    questionNumber: 5,
    question: questionsInShuffledOrder[4].question,
    answers: questionsInShuffledOrder[4].choices,
    questionId: questionsInShuffledOrder[4].questionId,
  });

  await countDown(10);

  let gameInfo = scorecards.findTheWinner(room.roomId);

  io.to(room.playerOne.id).to(room.playerTwo.id).emit("game", {
    roomId: room.roomId,
    state: "stop",
    info: gameInfo,
  });

  await database.addGameToHistory(room);
}

module.exports = { game };
