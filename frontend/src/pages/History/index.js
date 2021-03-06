import React from "react";
import styled from "@emotion/styled";
import ExpandableCard from "../../components/ExpandableCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const HistoryContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Histories = styled.div`
  height: 600px;
  width: 60%;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll !important;
  align-items: center;
  gap: 2rem;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default function History() {
  let [history, setHistory] = useState(null);
  async function getHistory() {
    try {
      let response = await axios.get("http://localhost:5000/history");
      setHistory(response.data.history);
      console.log(response.data.history);
    } catch (err) {}
  }

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <HistoryContainer>
      <Histories>
        {history && (
          <>
            {history.map((item) => {
              return (
                <ExpandableCard
                  playerOne={item.playerOne.name}
                  date={item.date}
                  playerTwo={item.playerTwo.name}
                  draw={item.draw}
                  playerOnePoints={item.pointsPlayerOne}
                  playerTwoPoints={item.pointsPlayerTwo}
                />
              );
            })}
          </>
        )}

        {!history && (
          <div style={{ textAlign: "center", paddingTop: "3rem" }}>
            <Typography variant="h5" paragraph>
              Loading...
            </Typography>
            <CircularProgress />
          </div>
        )}
      </Histories>
    </HistoryContainer>
  );
}
