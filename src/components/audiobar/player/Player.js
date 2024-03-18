import { Grid, styled } from "@mui/material";
import Controllers from "./Controllers";
import SeekSlider from "./SeekSlider";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangePosition,
  onChangeTrack,
  onChangeVolume,
  onPause,
  onPlay,
} from "../../../store/reducers/playerSlice";
import { createSelector } from "@reduxjs/toolkit";

const Audio = styled("audio")({
  display: "none",
  visibility: "hidden",
});

function Player() {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const { volume, loop, playing } = useSelector((state) => state.player);

  const selectSongs = (state) => state.player.playlist;
  const selectCurrentSongId = (state) => state.player.current;
  const selectCurrentSong = createSelector(
    [selectSongs, selectCurrentSongId],
    (songs, currentId) => songs.find((song) => song.id === currentId)
  );
  const { audio, duration } = useSelector(selectCurrentSong);

  function onKeyDownHandler(event) {
    if (event.keyCode === 39 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      dispatch(onChangeTrack("next"));
      handlers.play();
    }
    if (event.keyCode === 37 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handlers.stop();
      dispatch(onChangeTrack("prev"));
      queueMicrotask(() => handlers.play());
    }

    if (event.keyCode === 38 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      if (volume === 100) return;

      const nextVolume = volume + 5 < 100 ? volume + 5 : 100;
      dispatch(onChangeVolume(nextVolume));
    }
    if (event.keyCode === 40 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      if (volume === 0) return;

      const nextVolume = volume - 5 > 0 ? volume - 5 : 0;
      dispatch(onChangeVolume(nextVolume));
    }

    if (event.target.nodeName !== "INPUT" && event.code === "Space") {
      event.preventDefault();

      if (playing) handlers.pause();
      else handlers.play();
    }
  }

  useEffect(() => {
    handlers.changeVolume(volume);

    if (playing) {
      handlers.play();
    } else {
      handlers.pause();
    }

    document.addEventListener("keydown", onKeyDownHandler);

    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  }, [volume, playing]);

  const handlers = {
    play() {
      try {
        const promise = ref.current.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              dispatch(onPlay());
            })
            .catch((e) => {
              try {
                this.stop();
                dispatch(onChangeTrack("next"));
                queueMicrotask(this.play);
              } catch {}
            });
        }
      } catch {}
    },
    stop() {
      ref.current.src = "";
      ref.current.src = audio;
      this.changePosition(0);
    },
    pause() {
      ref.current.pause();
      dispatch(onPause());
    },
    changePosition(position) {
      ref.current.currentTime = position;
    },
    changeVolume(value) {
      ref.current.volume = value / 100;
    },
  };

  function onTimeUpdate(e) {
    const time = e.target.currentTime;

    dispatch(onChangePosition(time));

    if (time >= duration) {
      if (loop) {
        handlers.changePosition(0);
        handlers.play();
      } else {
        dispatch(onChangeTrack("next"));
        queueMicrotask(handlers.play);
      }
    }
  }

  return (
    <Grid container justifyContent="center" justifySelf="center" width={"34vw"}>
      <Controllers handlers={handlers} />
      <SeekSlider handlers={handlers} />
      <Audio ref={ref} src={audio} onTimeUpdate={onTimeUpdate} autoPlay />
    </Grid>
  );
}

export default Player;
