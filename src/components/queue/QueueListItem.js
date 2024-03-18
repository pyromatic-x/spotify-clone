import { MoreHoriz, Pause, PlayArrow } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Link,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import PlayingAnimation from "./PlayingAnimation";
import { useDispatch } from "react-redux";
import {
  changeTrackById,
  onPause,
  onPlay,
} from "../../store/reducers/playerSlice";
import LikeButton from "../buttons/LikeButton";
import { formatDuration } from "../../utils/strings";
import { memo } from "react";

const StyledContainer = styled(Grid)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "28px 1fr 20% 36px 30px 40px",
  gap: "8px",
  alignItems: "center",
  padding: "6px 8px 6px 12px",
  borderRadius: "6px",
  cursor: "pointer",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "28px 1fr auto auto auto",

    "& .queue-item-album": {
      display: "none",
    },
  },

  "&:hover": {
    backgroundColor: theme.palette.secondary.light,

    "& .MuiTypography-root": {
      color: theme.palette.text.primary,
    },

    "& .queue-item-menu-button": {
      opacity: 1,
    },
  },

  "& .queue-item-name": {
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  "& .MuiTypography-root": {
    fontSize: "0.9rem",

    "&.active": {
      color: theme.palette.green.main,
    },
  },
}));

const StyledIndexNumberContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const AlbumLink = styled(Link)({
  display: "-webkit-box",
  WebkitLineClamp: "1",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

function Track({ cover, name, authors, active }) {
  return (
    <Grid container direction="row" flexWrap="nowrap" alignItems="center">
      <Avatar variant="rounded" src={cover} sx={{ marginRight: 2 }} />
      <Grid container direction="column">
        <Typography
          className={(active ? "active" : "").concat(" queue-item-name")}
          fontWeight="bold"
        >
          {name}
        </Typography>
        <Typography lineHeight={1}>
          {authors.map((author, index) => (
            <Box component="span" key={index + "-" + author}>
              <Link underline="hover" color="secondary">
                {author}
              </Link>
              {index + 1 !== authors.length ? ", " : ""}
            </Box>
          ))}
        </Typography>
      </Grid>
    </Grid>
  );
}

function IndexNumber({ id, index, active, playing, hovering, actions }) {
  function NotHoveringNotPlaying() {
    return (
      <Typography
        color={active ? "green.main" : "white"}
        className="index-number"
        textAlign="center"
      >
        {index}
      </Typography>
    );
  }
  function NotHoveringPlaying() {
    return active ? (
      <IconButton disableRipple sx={{ padding: 0 }}>
        <PlayingAnimation />
      </IconButton>
    ) : (
      <NotHoveringNotPlaying />
    );
  }
  function HoveringNotPlaying() {
    return (
      <IconButton
        disableRipple
        sx={{ padding: 0 }}
        onClick={() => (active ? actions.play() : actions.change(id))}
      >
        <PlayArrow />
      </IconButton>
    );
  }
  function HoveringPlaying() {
    return active ? (
      <IconButton
        disableRipple
        sx={{ padding: 0 }}
        onClick={() => actions.pause()}
      >
        <Pause />
      </IconButton>
    ) : (
      <HoveringNotPlaying />
    );
  }

  return (
    <StyledIndexNumberContainer>
      {!hovering && !playing && <NotHoveringNotPlaying />}
      {!hovering && playing && <NotHoveringPlaying />}
      {hovering && !playing && <HoveringNotPlaying />}
      {hovering && playing && <HoveringPlaying />}
    </StyledIndexNumberContainer>
  );
}

const QueueListItem = memo(function QueueListItem({
  track,
  active,
  index,
  playing,
}) {
  const dispatch = useDispatch();

  const [hovering, setHovering] = useState(false);

  const changeTrack = () => dispatch(changeTrackById(track.id));
  const playTrack = () => dispatch(onPlay());
  const pauseTrack = () => dispatch(onPause());

  return (
    <StyledContainer
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <IndexNumber
        id={track.id}
        index={index}
        active={active}
        playing={playing}
        hovering={hovering}
        actions={{ play: playTrack, pause: pauseTrack, change: changeTrack }}
      />
      <Track
        cover={track.cover}
        name={track.name}
        authors={track.authors}
        active={active}
      />
      <AlbumLink
        underline="hover"
        color="secondary"
        className="queue-item-album"
      >
        {track.album}
      </AlbumLink>
      <Box sx={{ opacity: track.liked || hovering ? 1 : 0 }}>
        <LikeButton id={track.id} />
      </Box>
      <Typography color="secondary" textAlign="center">
        {formatDuration(track.duration)}
      </Typography>
      <IconButton
        sx={{ padding: 0, width: "40px", height: "40px", opacity: "0" }}
        className="queue-item-menu-button"
      >
        <MoreHoriz />
      </IconButton>
    </StyledContainer>
  );
});

export default QueueListItem;
