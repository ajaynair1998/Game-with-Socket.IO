import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearDeterminate(props) {
  const [progress, setProgress] = React.useState(props.progress);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }

        return oldProgress + 10;
      });
    }, 900);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%", marginBottom: "3rem" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
