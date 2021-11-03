// We will create Lobby at the top so that we can create new lobbies when each player comes
class Lobby {
  constructor() {
    this.lobbies = [[]];
  }

  get isReadyToStart() {
    this.lobbies[this.lobbies.length - 1] === 2 ? true : false;
  }

  set addSecondPlayer(playerTwo) {
    this.lobbies[this.lobbies.length - 1].push(playerTwo);
  }

  get needOneMorePlayer() {
    //   since we are considering lobbies as a stack
    let topLobby = this.lobbies[this.lobbies.length - 1];

    if (topLobby.length == 1) {
      return true;
    }
    // Means starting a game is not possible ,
    // the new user has to wait
    return false;
  }

  set addToWaiting(playerOne) {
    this.lobbies[this.lobbies.length - 1].push(playerOne);
  }

  startGame() {
    let gameLobby = this.lobbies[this.lobbies.length - 1];

    // add a new lobby when we fill an existing lobby
    this.lobbies.push([]);
    return gameLobby;
  }
}

export default Lobby;
