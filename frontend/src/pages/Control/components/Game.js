import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LinearDeterminate from "./ProgressBar";

let defaultAnswers = ["One", "Two", "Three"];

export default function Game(props) {
  const [socket, setSocket] = useState(props.socket);
  const [question, setQuestion] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [choices, setChoices] = useState(defaultAnswers);
  const [roomId, setRoomId] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [gameState, setGameState] = useState("lobby");
  const [progressBar, setProgressBar] = useState(0);
  const [endGameState, setEndGameState] = useState("undetermined");

  useEffect(() => {
    socket.on("game", (data) => {
      console.log(gameState);
      console.log(data);
      changeStateOfGame(data);
    });
  }, [socket]);

  let changeStateOfGame = (data) => {
    if (data.state === "start") {
      setGameState("start");
      setChoices(data.answers);
      setQuestion(data.question);
      setRoomId(data.roomId);
      setQuestionNumber(data.questionNumber);
      setProgressBar(0);
    }

    if (data.state === "stop") {
      setGameState("stop");
      setEndGameState("won");
    }
  };

  let sendAnswerToServer = (choice) => {
    socket.emit("answer", {
      playerId: socket.id,
      roomId: roomId,
      selectedChoice: choice,
      questionId: questionNumber,
    });
    setGameState("waiting");
  };

  return (
    <Box>
      {gameState === "start" && (
        <GameInStartState
          roomId={roomId}
          questionNumber={questionNumber}
          question={question}
          choices={choices}
          progress={progressBar}
          sendAnswerToServer={sendAnswerToServer}
        />
      )}

      {gameState === "waiting" && <WaitTillNextQuestionScreen />}

      {gameState === "lobby" && <LobbyScreen />}
      <EndGameScreen endGameState={endGameState} />
    </Box>
  );
}
function GameInStartState(props) {
  return (
    <Box>
      <Typography variant="h5" textAlign="center" mb={4}>
        {" "}
        Room id : {props.roomId}
      </Typography>

      {<LinearDeterminate progress={props.progress} />}

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
            {props.questionNumber}. {props.question}
          </Typography>
        </Box>
        <Box
          className="choices-container"
          sx={{ display: "flex", flexDirection: "column", gap: "3rem" }}
        >
          {props.choices.map((item, index) => {
            return (
              <Button
                variant="outlined"
                key={item}
                onClick={() => props.sendAnswerToServer(index)}
              >
                {item}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

function LobbyScreen(props) {
  return (
    <Box>
      <Typography variant="h3">
        Please wait until another player joins
      </Typography>
    </Box>
  );
}

function WaitTillNextQuestionScreen(props) {
  return (
    <Box>
      <Typography variant="h3">Wait for the next question</Typography>
    </Box>
  );
}

function EndGameScreen(props) {
  return (
    <Box>
      {props.endGameState === "won" && <Typography>You Have Won</Typography>}
      {props.endGameState === "lost" && (
        <Typography>You have lost the game</Typography>
      )}
      {props.endGameState === "undetermined" && null}
    </Box>
  );
}
