let answerSheet = require("../Questions/answers.json");

function trackScores(scorecards, playerId, roomId, questionId, selectedChoice) {
  //   add score to player only if their answer is correct
  if (answerSheet.answers[questionId] == selectedChoice) {
    scorecards.addScoreToPlayer(roomId, playerId);
  }
  console.log(answerSheet);
  console.log(scorecards, "tracking scores");
}

module.exports = { trackScores };
