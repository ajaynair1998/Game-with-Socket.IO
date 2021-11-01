import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

let defaultAnswers = ["One", "Two", "Three"];

export default function Game(props) {
  const [socket, setSocket] = useState(props.socket);
  const [question, setQuestion] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [choices, setChoices] = useState(defaultAnswers);
  const [roomId, setRoomId] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    socket.on("game", (data) => {
      console.log(data);
      
    });
  },[socket]);

  
  return (
    <Box>
      <Typography variant="h5" textAlign="center">
        {" "}
        Room id : {roomId}
      </Typography>

      <Typography variant="h5" textAlign="center" sx={{ mb: "5rem" }}>
        {" "}
        Time Left : {timeLeft}
      </Typography>

      <Box
        sx={{
          gap: "2rem",
          flexDirection: "column",
          display: "flex",
          textAlign: "center",
        }}
      >
        <Box className="question-container">
          <Typography variant="h5">
            {questionNumber}. What is the first Number ?
          </Typography>
        </Box>
        <Box
          className="choices-container"
          sx={{ display: "flex", flexDirection: "column", gap: "3rem" }}
        >
          {choices.map((item) => {
            return (
              <Button variant="outlined" key={item}>
                {item}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
