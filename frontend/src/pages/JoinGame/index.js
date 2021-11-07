// This is the parent component which handles everything related to sockets

import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import io from "socket.io-client";

// import different pages
import EnterName from "../../components/PlayerName";
import Game from "../../components/Game";

export default function Control(props) {
  const [socket, setSocket] = useState(null);
  const [joined, setJoined] = useState(false);
  const [playerName, setPlayerName] = useState("default");

  //   Connext to a socket on mount
  useEffect(() => {
    console.log("from use effect", socket);

    // on unmounting disconnect from the socket
    return () => (socket ? socket.close() : null);
  }, [socket]);

  // connect to socket with the given name
  const connectToSocket = (playerName) => {
    const newSocket = io(`http://localhost:5000`);
    console.log(newSocket);
    newSocket.emit("join-game", { playerName: playerName });
    setJoined(true);
    setSocket(newSocket);
    setPlayerName(playerName);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 0,
      }}
      p={2}
    >
      {!joined && <EnterName connectToSocket={connectToSocket} />}

      {joined && <Game socket={socket} playerName={playerName} />}
    </Box>
  );
}
