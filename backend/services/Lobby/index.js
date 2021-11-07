// We will create Lobby at the top so that we can create new lobbies when each player comes
class Lobby {
  constructor() {
    this.lobbies = [[]];
  }

  get isReadyToStart() {
    return this.lobbies[this.lobbies.length - 1].length === 2 ? true : false;
  }

  set addPlayer(player) {
    this.lobbies[this.lobbies.length - 1].push(player);
  }

  startGame() {
    let gameLobby = this.lobbies[this.lobbies.length - 1];

    // add a new lobby when we fill an existing lobby
    this.lobbies.push([]);
    return gameLobby;
  }
}

module.exports = { Lobby };
