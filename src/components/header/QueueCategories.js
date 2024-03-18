import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

const ButtonSX = {
  backgroundColor: "transparent",
  "&.active": {
    backgroundColor: "secondary.light",
  },
  "&:not(.active):hover": {
    backgroundColor: "initial",
  },
};

function QueueCategories() {
  const [active] = useState("queue");

  return (
    <Grid container gap={1}>
      <Button
        sx={ButtonSX}
        className={active === "queue" ? "active" : ""}
        disableRipple
      >
        <Typography fontWeight="bold" fontSize="0.9rem" color="white">
          Queue
        </Typography>
      </Button>
      <Button
        sx={ButtonSX}
        className={active === "recently" ? "active" : ""}
        disableRipple
      >
        <Typography fontWeight="bold" fontSize="0.9rem" color="white">
          Recently Played
        </Typography>
      </Button>
    </Grid>
  );
}

export default QueueCategories;
