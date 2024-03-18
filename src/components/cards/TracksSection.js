import { Grid, Typography } from "@mui/material";
import Track from "./Track";

function TracksSection({ tracks }) {
  return (
    <Grid item lg={8} md={12}>
      <Typography fontWeight="bold" variant="h6" color="white" mb={2}>
        Songs
      </Typography>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </Grid>
  );
}

export default TracksSection;
