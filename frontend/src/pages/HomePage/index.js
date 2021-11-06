import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import TextMobileStepper from "../../components/Lobbies";

function HomePage() {
  const [lobbies, setLobbies] = useState(null);

  useEffect(() => {
    getAllLobbies();
  }, []);

  let getAllLobbies = async () => {
    let response = await axios.get("http://localhost:5000/scores");
    console.log(response);
    let { data } = response;

    let checkIfScoresExist =
      data.scores.length > 0 ? setLobbies(data.scores.reverse()) : null;
  };

  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      {lobbies && <TextMobileStepper lobbies={lobbies} />}
      {!lobbies && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
            <Typography variant="h6">No Rooms currently in Play</Typography>
            <Link style={{ width: "100%", textDecoration: "none" }} to="/game">
              <Button variant="contained" sx={{ width: "100%" }}>
                <Typography>Join a room</Typography>
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default HomePage;
