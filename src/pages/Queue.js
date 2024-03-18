import { Grid, Typography } from "@mui/material";
import QueueList from "../components/queue/QueueList";

function Queue() {
  document.title = "Spotify - Queue";

  return (
    <Grid position="relative" container direction="column" gap={3.5}>
      <Typography variant="h6" fontWeight="bold">
        Queue
      </Typography>
      <QueueList />
    </Grid>
  );
}

export default Queue;
