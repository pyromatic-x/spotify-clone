import { Box, styled } from "@mui/material";
import CurrentTrack from "./CurrentTrack";
import Player from "./player/Player";
import Additional from "./additional/Additional";

const Container = styled(Box)({
  gridColumn: "span 2",
  display: "grid",
  gridTemplateColumns: "25% 1fr 25%",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

function AudioBar() {
  return (
    <Container>
      <CurrentTrack />
      <Player />
      <Additional />
    </Container>
  );
}

export default AudioBar;
