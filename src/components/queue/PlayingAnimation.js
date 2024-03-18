import styled from "@emotion/styled";
import { Box } from "@mui/material";

const AnimationLine = styled("div")(({ theme, animation = "first" }) => ({
  width: "100%",
  backgroundColor: theme.palette.green.main,
  animationName: animation,
  animationDuration: "0.65s",
  animationTimingFunction: "ease-out",
  animationIterationCount: "infinite",

  "@keyframes first": {
    "0%": { height: "5%" },
    "33%": { height: "50%" },
    "66%": { height: "100%" },
    "100%": { height: "5%" },
  },
  "@keyframes second": {
    "0%": { height: "50%" },
    "33%": { height: "100%" },
    "66%": { height: "5%" },
    "100%": { height: "50%" },
  },
  "@keyframes third": {
    "0%": { height: "100%" },
    "33%": { height: "5%" },
    "66%": { height: "50%" },
    "100%": { height: "100%" },
  },
  "@keyframes fourth": {
    "0%": { height: "5%" },
    "33%": { height: "37%" },
    "66%": { height: "83%" },
    "100%": { height: "5%" },
  },
}));

const containerSX = {
  display: "flex",
  width: "15px",
  height: "18px",
  gap: "1px",
  transform: "rotate(180deg)",
};

function PlayingAnimation() {
  return (
    <Box component="div" sx={containerSX}>
      <AnimationLine animation="first" />
      <AnimationLine animation="second" />
      <AnimationLine animation="third" />
      <AnimationLine animation="fourth" />
    </Box>
  );
}

export default PlayingAnimation;
