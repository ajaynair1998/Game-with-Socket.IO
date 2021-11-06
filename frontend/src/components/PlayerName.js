import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

export default function EnterName(props) {
  const [playerName, setName] = useState("player");
  return (
    <Box
      sx={{
        gap: "2rem",
        flexDirection: "column",
        display: "flex",
        textAlign: "center",
      }}
    >
      <Typography>Enter Your Name</Typography>
      <TextField
        id="outlined-basic"
        label="Player Name"
        variant="outlined"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <Button
        variant="outlined"
        onClick={() => props.connectToSocket(playerName)}
      >
        JOIN
      </Button>
    </Box>
  );
}
