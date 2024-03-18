import { List } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import QueueListItem from "./QueueListItem";

function QueueList() {
  const selectPlaylist = (state) => state.player.playlist;
  const selectPlaying = (state) => state.player.playing;
  const selectCurrent = (state) => state.player.current;

  const selector = createSelector(
    [selectPlaylist, selectPlaying, selectCurrent],
    (playlist, playing, current) => {
      return { playlist, playing, current };
    }
  );

  const { playlist, playing, current } = useSelector(selector);

  return (
    <List disablePadding>
      {playlist.map((track, index) => (
        <QueueListItem
          key={track.id}
          track={track}
          active={current === track.id}
          playing={playing}
          index={index + 1}
        />
      ))}
    </List>
  );
}

export default QueueList;
