import {
  Loop,
  Pause,
  PlayArrow,
  Shuffle,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import { Button, Grid, IconButton, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeTrack,
  onLoop,
  onShuffle,
} from "../../../store/reducers/playerSlice";

const ControllersButton = styled(IconButton)(({ theme, active }) => ({
  position: "relative",
  width: "36px",
  height: "36px",
  padding: "0px",
  transition: "0.2s ease",
  "& svg": {
    fontSize: "22px",
    fill:
      active === "true" ? theme.palette.green.main : theme.palette.secondary,
    opacity: active === "true" ? 0.85 : 1,
  },
  "&:hover": {
    backgroundColor: "transparent",
    "& svg": {
      fill: active === "true" ? theme.palette.green.main : theme.palette.white,
      opacity: 1,
    },
  },
  [active === "true" ? "&::after" : ""]: {
    content: "''",
    position: "absolute",
    left: "calc(50% - 2px)",
    bottom: "0px",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    backgroundColor: theme.palette.green.main,
  },
}));

const PlayPauseButton = styled(Button)({
  borderRadius: "50%",
  backgroundColor: "white",
  minWidth: "36px",
  minHeight: "36px",
  padding: "0px",
  color: "black",
  transition: "0.2s ease",
  "&:hover": {
    backgroundColor: "white",
  },
  "&.paused:hover": {
    transform: "scale(1.07)",
  },
});

ControllersButton.defaultProps = {
  disableRipple: true,
};
PlayPauseButton.defaultProps = {
  disableRipple: true,
};

function Controllers({ handlers }) {
  const dispatch = useDispatch();
  const { playing, loop, shuffle } = useSelector((state) => state.player);

  function onPlayHandler() {
    handlers.play();
  }

  function onPauseHandler() {
    handlers.pause();
  }

  function onChangeTrackHandler(direction) {
    handlers.stop();
    dispatch(onChangeTrack(direction));
    queueMicrotask(onPlayHandler);
  }

  return (
    <Grid container columnGap={1} width="max-content" flexWrap="nowrap">
      <ControllersButton
        active={shuffle.toString()}
        onClick={() => dispatch(onShuffle())}
      >
        <Shuffle color="secondary" />
      </ControllersButton>
      <ControllersButton onClick={() => onChangeTrackHandler("prev")}>
        <SkipPrevious color="secondary" />
      </ControllersButton>

      {playing ? (
        <PlayPauseButton onClick={onPauseHandler}>
          <Pause />
        </PlayPauseButton>
      ) : (
        <PlayPauseButton onClick={onPlayHandler} className="paused">
          <PlayArrow />
        </PlayPauseButton>
      )}

      <ControllersButton onClick={() => onChangeTrackHandler("next")}>
        <SkipNext color="secondary" />
      </ControllersButton>
      <ControllersButton
        active={loop.toString()}
        onClick={() => dispatch(onLoop())}
      >
        <Loop color="secondary" />
      </ControllersButton>
    </Grid>
  );
}

export default Controllers;
