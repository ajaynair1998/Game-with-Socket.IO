// This is the parent component which handles everything related to sockets

import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import io from "socket.io-client";

// import different pages
import EnterName from "./components/EnterName";

export default function Control(props) {
  const [socket, setSocket] = useState(null);
  const [joined, setJoined] = useState(false);
  const [playerName, setName] = useState("player");

  //   Connext to a socket on mount
  useEffect(() => {
    console.log("from use effect", socket);

    // on unmounting disconnect from the socket
    return () => (socket ? socket.close() : null);
  }, [socket]);

  // connect to socket with the given name
  const connectToSocket = (PlayerName) => {
    const newSocket = io(`http://localhost:5000`);
    console.log(newSocket);
    newSocket.emit("id", { playerName: playerName });

    setSocket(newSocket);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        // "&:hover": {
        //   backgroundColor: "primary.main",
        //   opacity: [0.9, 0.8, 0.7],
        // },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      p={2}
    >
      {!joined && (
        <EnterName setName={setName} connectToSocket={connectToSocket} />
      )}
    </Box>
  );
}
