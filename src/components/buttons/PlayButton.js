import { PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const SX = {
  color: "black",
  backgroundColor: "green.main",
  opacity: "0",
  transition: "opacity 0.3s ease",
  fontSize: "2rem",
  boxShadow: "0px 4px 10px 0px rgba(0,0,0, 0.7)",
  "&:hover": {
    transform: "scale(1.05) translateY(0px) translateX(0px)",
  },
};

function PlayButton({ sx = {}, className = "" }) {
  return (
    <IconButton
      className={className}
      disableRipple
      sx={{
        ...SX,
        ...sx,
      }}
    >
      <PlayArrow fontSize="2rem" color="black.main" />
    </IconButton>
  );
}

export default PlayButton;
