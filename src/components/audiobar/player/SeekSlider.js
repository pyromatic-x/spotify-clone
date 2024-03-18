import { Grid, Slider, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { onChangePosition } from "../../../store/reducers/playerSlice";
import { createSelector } from "@reduxjs/toolkit";
import { memo, useLayoutEffect, useState } from "react";

const sliderSX = {
  color: "white",
  height: 4,
  "&:hover .MuiSlider-thumb": {
    opacity: 1,
  },
  "&:hover .MuiSlider-track": {
    backgroundColor: "green.main",
    transition: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "secondary.light2",
  },
  "& .MuiSlider-track": {
    backgroundColor: "white",
    border: "none",
  },
  "& .MuiSlider-thumb": {
    opacity: 0,
    width: 12,
    height: 12,
    transition: "none",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&::after": {
      width: "26px",
      height: "26px",
    },
  },
};

const Time = styled(Typography)({
  fontSize: "12px",
});

Time.defaultProps = {
  color: "secondary",
};

const SeekSlider = memo(function SeekSlider({ handlers }) {
  const dispatch = useDispatch();
  const { playingPosition } = useSelector((state) => state.player);

  const [value, setValue] = useState(playingPosition);
  const [isClicked, setIsClicked] = useState(false);

  const selectSongs = (state) => state.player.playlist;
  const selectCurrentSongId = (state) => state.player.current;

  const selectCurrentSong = createSelector(
    [selectSongs, selectCurrentSongId],
    (songs, currentId) => songs.find((song) => song.id === currentId)
  );
  const { duration } = useSelector(selectCurrentSong);

  useLayoutEffect(() => {
    if (!isClicked) setValue(playingPosition);
  }, [playingPosition, isClicked]);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  function handleOnChange(value) {
    setIsClicked(true);
    setValue(value);
  }

  function handleOnChangeCommitted() {
    dispatch(onChangePosition(value));
    handlers.changePosition(value);

    setValue(playingPosition);
    setIsClicked(false);
  }

  return (
    <Grid container columnGap={2} wrap="nowrap" alignItems="center">
      <Time>{formatDuration(isClicked ? value : playingPosition)}</Time>
      <Slider
        defaultValue={0}
        sx={sliderSX}
        value={value}
        min={0}
        step={1}
        max={duration}
        onChange={(event) => {
          handleOnChange(event.target.value);
        }}
        onChangeCommitted={(event) => handleOnChangeCommitted(event)}
      />
      <Time>{formatDuration(duration)}</Time>
    </Grid>
  );
});

export default SeekSlider;
