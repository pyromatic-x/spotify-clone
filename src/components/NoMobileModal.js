import { Box, Link, Typography, styled, useTheme } from "@mui/material";
import Logo from "../assets/icons/Logo";

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  pointerEvents: "all",
  transition: "0.25s ease",

  "&.hidden": {
    backgroundColor: "rgba(0, 0, 0, 0)",
    pointerEvents: "none",
  },

  "&.hidden .demo-modal": {
    opacity: 0,
    pointerEvents: "none",
    transform: "translateY(100px)",
  },
});

const Modal = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  width: "80%",
  height: "80%",
  backgroundColor: theme.palette.green.main,
  padding: "15px",
  color: theme.palette.text.gray,
  overflow: "hidden",
  outline: "10px solid rgba(255, 255, 255, 0.1)",
  pointerEvents: "all",
  opacity: 1,
  transform: "translateY(0px)",
  transition: "0.25s ease",
}));

const Circle = styled(Box)(
  ({
    theme,
    size = "140px",
    top = "none",
    left = "none",
    right = "none",
    bottom = "none",
    filled,
  }) => ({
    top,
    left,
    right,
    bottom,
    width: size,
    height: size,
    position: "absolute",
    borderRadius: "50%",
    borderWidth: "10px",
    borderColor: theme.palette.grandis,
    borderStyle: "solid",
    backgroundColor: filled ? theme.palette.grandis : "",
  })
);

function NoMobileModal() {
  const theme = useTheme();

  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobile = regex.test(navigator.userAgent);

  return (
    <Overlay zIndex={theme.zIndex.modal}>
      <Modal className="demo-modal">
        <Typography
          component="h1"
          fontSize="2.1rem"
          fontWeight="bold"
          mb="15px"
        >
          Spotify Clone
        </Typography>
        <Typography mb="30px">
          A demo of our lovely Spotify made by{" "}
          <Link
            href="https://pyromatic.me/"
            target="_blank"
            color="black"
            fontWeight="bold"
          >
            @pyromatic
          </Link>
        </Typography>
        <Typography mb="40px">
          Unfortunately this demo application has no mobile version. Please,
          open the application via laptop{" "}
          {!isMobile ? "or stop playing with browser's width" : ""} 😊
        </Typography>
        <Logo size="2.5em" sx={{ display: "block", marginBottom: "40px" }} />
        <Circle bottom="-5vw" right="-9vw" />
        <Circle bottom="20vw" left="10vw" size="24vw" />
        <Circle bottom="16vw" right="3vw" size="28vw" filled="true" />
        <Circle bottom="-10vw" left="-15vw" size="43vw" filled="true" />
      </Modal>
    </Overlay>
  );
}

export default NoMobileModal;
