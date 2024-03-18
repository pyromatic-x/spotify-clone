import { Box, Grid, Link } from "@mui/material";
import LikeButton from "../buttons/LikeButton";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const textSX = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  maxWidth: "15vw",
};

function CurrentTrack() {
  const selectSongs = (state) => state.player.playlist;
  const selectCurrentSongId = (state) => state.player.current;
  const selectCurrentSong = createSelector(
    [selectSongs, selectCurrentSongId],
    (songs, currentId) => songs.find((song) => song.id === currentId)
  );

  const { name, authors, cover, id } = useSelector(selectCurrentSong);

  return (
    <Grid
      container
      alignItems={"center"}
      columnGap={"0.9rem"}
      width={"auto"}
      flexWrap="nowrap"
    >
      <Box
        component="img"
        sx={{
          height: 54,
          width: 54,
          borderRadius: 2,
        }}
        alt={name}
        src={cover}
      />
      <Grid>
        <Link underline="hover" color="inherit" fontSize={14} sx={textSX}>
          {name}
        </Link>
        <Link
          underline="hover"
          color="secondary"
          fontSize={12}
          display="block"
          sx={textSX}
        >
          {authors.slice(0, 2).join(", ")}
        </Link>
      </Grid>
      <LikeButton id={id} />
    </Grid>
  );
}

export default CurrentTrack;
