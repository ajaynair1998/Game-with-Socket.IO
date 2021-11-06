import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LinearDeterminate from "./ProgressBar";

let defaultAnswers = ["One", "Two", "Three"];

export default function Game(props) {
  const [socket, setSocket] = useState(props.socket);
  const [question, setQuestion] = useState("");

  const [choices, setChoices] = useState(defaultAnswers);
  const [roomId, setRoomId] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [gameState, setGameState] = useState("lobby");
  const [progressBar, setProgressBar] = useState(0);
  const [endGameState, setEndGameState] = useState("undetermined");
  const [questionId, setQuestionId] = useState(null);

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
      setQuestionId(data.questionId);
    }

    if (data.state === "stop") {
      setGameState("stop");
      if (data.info.winner === socket.id && !data.info.draw) {
        setEndGameState("won");
      } else if (data.info.loser === socket.id && !data.info.draw) {
        setEndGameState("lost");
      } else if (data.info.draw) {
        setEndGameState("draw");
      }
    }
  };

  let sendAnswerToServer = (choice) => {
    socket.emit("answer", {
      playerId: socket.id,
      roomId: roomId,
      selectedChoice: choice,
      questionId: questionId,
    });
    setGameState("waiting");
  };

  return (
    <Box sx={{ color: "white", p: 2 }}>
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
    <Box p={2}>
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
      <Typography variant="h3">Wait...</Typography>
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
      {props.endGameState === "draw" && (
        <Typography>The Game is a draw</Typography>
      )}

      {props.endGameState === "undetermined" && null}
    </Box>
  );
}
