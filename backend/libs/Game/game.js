// main game function which controls the users and the game
function game(socket) {
  socket.emit("game", { data: "hi" });
  console.log(socket);
}

module.exports = { game };
