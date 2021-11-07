// Class for storing the player info when recieving each socket connection
class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

module.exports = { Player };
