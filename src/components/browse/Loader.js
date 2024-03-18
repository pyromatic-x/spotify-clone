import { Box, styled } from "@mui/material";

const StyledLoaderContainer = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledLoader = styled("span")(({ theme }) => ({
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  display: "block",
  margin: "15px auto",
  position: "relative",
  background: theme.palette.secondary.light2,
  boxShadow: `-32px 0 ${theme.palette.secondary.light2}, 32px 0 ${theme.palette.secondary.light2}`,
  boxSizing: "border-box",
  animation: "shadowPulse 1.5s linear infinite",

  "@keyframes shadowPulse": {
    "0%": {
      background: theme.palette.secondary.light2,
      boxShadow: `-32px 0 ${theme.palette.green.main}, 32px 0 ${theme.palette.secondary.light2}`,
    },
    "33%": {
      background: `${theme.palette.green.main}`,
      boxShadow: `-32px 0 ${theme.palette.secondary.light2}, 32px 0 ${theme.palette.secondary.light2}`,
    },
    "66%": {
      background: theme.palette.secondary.light2,
      boxShadow: `-32px 0 ${theme.palette.secondary.light2}, 32px 0 ${theme.palette.green.main}`,
    },
    "100%": {
      background: theme.palette.secondary.light2,
      boxShadow: `-32px 0 ${theme.palette.secondary.light2}, 32px 0 ${theme.palette.secondary.light2}`,
    },
  },
}));

export default function Loader() {
  return (
    <StyledLoaderContainer>
      <StyledLoader />
    </StyledLoaderContainer>
  );
}
