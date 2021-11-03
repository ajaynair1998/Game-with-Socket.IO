// main game function which controls the users and the game
function game(socket) {
  socket.emit("game", { data: "hi" });
  console.log(socket);
}

// Class for storing the player info when recieving each socket connection
class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  get name() {
    return this.name;
  }

  get id() {
    return this.id;
  }
}

module.exports = { game };
