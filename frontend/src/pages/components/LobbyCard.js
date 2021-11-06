import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function TextMobileStepper(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = props.lobbies.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Grid
      sx={{ display: "flex", flexDirection: "row-reverse", height: "100vh" }}
    >
      <Grid
        item
        md={6}
        lg={6}
        p={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Link sx={{ width: "100%", display: "inline-block" }} to="/game">
          <Button variant="contained" sx={{ width: "100%" }}>
            Join a room
          </Button>
        </Link>
      </Grid>
      <Grid
        item
        xs={6}
        md={12}
        lg={6}
        p={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "primary.main",
            }}
          >
            <Typography sx={{ color: "white" }}>
              Room - {props.lobbies[activeStep].roomId}
            </Typography>
          </Paper>
          <Box sx={{ maxWidth: 400, width: "100%", p: 2 }}>
            <Typography>
              Player one - {props.lobbies[activeStep].playerOne.name}
            </Typography>
            <Typography>
              {" "}
              Player two - {props.lobbies[activeStep].playerTwo.name}
            </Typography>
            <Box pt={3}>
              <Typography variant="h6">scoreboard</Typography>
              <Typography variant="h5">
                {" "}
                <b>{props.lobbies[activeStep].pointsPlayerOne}</b> :{" "}
                <b>{props.lobbies[activeStep].pointsPlayerTwo}</b>
              </Typography>
            </Box>
            <Box pt={3}>
              {!props.lobbies[activeStep].draw &&
                props.lobbies[activeStep].winner && (
                  <Typography variant="h6">
                    winner is {props.lobbies[activeStep].winner}{" "}
                  </Typography>
                )}
              {props.lobbies[activeStep].draw && (
                <Typography variant="h6">The game ended in a draw </Typography>
              )}
              {!props.lobbies[activeStep].draw &&
                !props.lobbies[activeStep].winner && (
                  <Typography variant="h6">The game is in progress </Typography>
                )}
            </Box>
          </Box>

          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{ bgcolor: "primary.main" }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                sx={{ color: "white" }}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ color: "white" }}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
}
