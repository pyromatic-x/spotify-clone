import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Link,
  Typography,
  styled,
} from "@mui/material";
import { memo, useState } from "react";
import LikeButton from "../buttons/LikeButton";
import { formatDuration } from "../../utils/strings";
import { MoreHoriz, PlayArrow } from "@mui/icons-material";

const StyledContainer = styled(Grid)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 36px 30px 40px",
  gap: "8px",
  alignItems: "center",
  padding: "6px 8px 6px 8px",
  borderRadius: "6px",
  cursor: "pointer",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr auto auto auto",
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
  },
}));

const Track = memo(function Track({ track }) {
  const [hovering, setHovering] = useState(false);

  return (
    <StyledContainer
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Grid
        container
        direction="row"
        flexWrap="nowrap"
        alignItems="center"
        position="relative"
      >
        <Avatar
          variant="rounded"
          src={track.image}
          alt={track.name}
          width={60}
          height={60}
          sx={{ marginRight: 2, opacity: hovering ? "0.4" : "1" }}
        />
        {hovering && (
          <IconButton sx={{ position: "absolute", left: "0" }} disableRipple>
            <PlayArrow />
          </IconButton>
        )}
        <Grid container direction="column">
          <Typography className="queue-item-name" fontWeight="bold">
            {track.name}
          </Typography>
          <Typography lineHeight={1}>
            {track.authors.map((author, index) => (
              <Box component="span" key={index + "-" + author}>
                <Link underline="hover" color="secondary">
                  {author}
                </Link>
                {index + 1 !== track.authors.length ? ", " : ""}
              </Box>
            ))}
          </Typography>
        </Grid>
      </Grid>
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
export default Track;
