import React from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import ExpandableCard from "../../components/ExpandableCard";
import { useEffect, useState } from "react";
import axios from "axios";

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
`;

export default function History(props) {
  let [history, setHistory] = useState(null);
  async function getHistory() {
    try {
      let response = await axios.get("http://localhost:5000/history");
      console.log(response.data.history);
    } catch (err) {}
  }

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <HistoryContainer>
      <Histories>
        <ExpandableCard
          playerOne={"ajay"}
          date={"13 November"}
          playerTwo={"Terminator"}
          draw={true}
          playerOnePoints={3}
          playerTwoPoints={5}
        />
      </Histories>
    </HistoryContainer>
  );
}
