import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import backgroundImage from "../assets/images/modal-background.png";
import Logo from "../assets/icons/Logo";
import { useState } from "react";
import {
  Audiotrack,
  HorizontalSplit,
  Keyboard,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  KeyboardOptionKey,
  QueueMusic,
  Search,
  SpaceBar,
  VolumeDown,
} from "@mui/icons-material";

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: theme.zIndex.modal,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  transition: "0.25s ease",
}));

const Modal = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  width: "80%",
  height: "80%",
  backgroundColor: theme.palette.green.main,
  padding: "16px 34px",
  color: theme.palette.text.gray,
  overflow: "hidden",
  outline: "10px solid rgba(255, 255, 255, 0.2)",
}));

const Circle = styled(Box)((props) => ({
  ...props,
  width: props.size,
  height: props.size,
  position: "absolute",
  borderRadius: "50%",
  borderWidth: "10px",
  borderColor: props.theme.palette.grandis,
  borderStyle: "solid",
  backgroundColor: props.filled ? props.theme.palette.grandis : "",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grandis,
  color: theme.palette.text.gray,
  fontWeight: "bold",
  textTransform: "unset",
  borderRadius: "20px",
  padding: "5px 30px",

  "&:hover": {
    backgroundColor: theme.palette.grandis,
    color: theme.palette.text.gray,
    transform: "scale(1.05)",
  },

  "&:disabled": {
    color: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "rgba(255, 204, 102, 0.7)",
  },
}));

const Background = styled(Box)(({ image }) => ({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "110% 20px",
}));

const availabilities = [
  {
    text: "Audio Player",
    icon: <Audiotrack />,
  },
  {
    text: "Filter and Search in Your Library",
    icon: <HorizontalSplit />,
  },
  {
    text: "Tracks Queue",
    icon: <QueueMusic />,
  },
  {
    text: "Change Volume",
    icon: <VolumeDown />,
  },
  {
    text: "Search Page",
    icon: <Search />,
  },
  {
    text: "Shortcuts",
    icon: <Keyboard />,
  },
];

const shortcuts = [
  {
    text: "Play/Pause: ",
    icons: [<SpaceBar />],
  },
  {
    text: "Next track: ",
    icons: [<KeyboardOptionKey />, <KeyboardArrowRight />],
  },
  {
    text: "Prev track: ",
    icons: [<KeyboardOptionKey />, <KeyboardArrowLeft />],
  },
  {
    text: "Volume up: ",
    icons: [<KeyboardOptionKey />, <KeyboardArrowUp />],
  },
  {
    text: "Volume down: ",
    icons: [<KeyboardOptionKey />, <KeyboardArrowDown />],
  },
];

function Icons({ icons }) {
  return (
    <Grid ml={1} sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {icons.map((icon, index) => {
        return (
          <Box key={index} display="flex" alignItems="center">
            {index !== 0 && index !== icons.length && "+"}
            {icon}
          </Box>
        );
      })}
    </Grid>
  );
}

function Greeting({ loading }) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const [visible, setVisible] = useState(true);

  function onCloseHandler() {
    if (!loading) setVisible(false);
  }

  const sx = {
    opacity: visible ? "1" : "0",
    transform: visible ? "scale(1)" : "scale(0.9)",
    pointerEvents: visible ? "all" : "none",
    backgroundColor: `rgba(0, 0, 0, ${visible ? "0.9" : "0"})`,
  };

  return (
    <Overlay sx={sx}>
      <Modal>
        <Background sx={{ opacity: md ? "0.3" : "1" }} />
        <Box sx={{ maxWidth: md ? "100%" : "60%", position: "relative" }}>
          <Typography component="h1" fontSize="3.9rem" fontWeight="bold">
            Spotify Clone
          </Typography>
          <Typography marginBottom={2}>
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
          <Typography mb={2}>
            Unfortunately some functions do not work due to the fact this is
            <b> a demo application</b>.
          </Typography>

          <Grid container mb={3} spacing={3}>
            <Grid item lg={6}>
              <Typography fontWeight="bold">What is available:</Typography>
              <List>
                {availabilities.map((a) => (
                  <ListItem key={a.text} sx={{ padding: "0" }}>
                    <ListItemText
                      sx={{
                        "& span": {
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        },
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          transform:
                            a.text === "Filter and Search in Your Library"
                              ? "rotate(270deg)"
                              : "none",
                        }}
                      >
                        {a.icon}
                      </Box>
                      {a.text}{" "}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item lg={6}>
              <Typography fontWeight="bold">Shortcuts:</Typography>
              <List sx={{ "& svg": { color: "white" } }}>
                {shortcuts.map((sc) => (
                  <ListItem
                    key={sc.text}
                    sx={{
                      padding: "0",
                      "&:not(:first-of-type)": { margin: "9px 0" },
                    }}
                  >
                    <ListItemText sx={{ padding: 0, margin: 0, flexGrow: 0 }}>
                      {sc.text}
                    </ListItemText>
                    <Icons icons={sc.icons} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          <Logo size="1.6em" sx={{ display: "block", marginBottom: 3 }} />

          <StyledButton
            disableRipple
            onClick={() => onCloseHandler()}
            disabled={loading}
          >
            <Typography mr={1.5} fontWeight="bold" fontSize="0.9rem">
              Okay, got it!
            </Typography>
            {loading && (
              <CircularProgress
                sx={{ color: "black", position: "absolute", right: "13px" }}
                size={20}
              />
            )}
          </StyledButton>
        </Box>
        <Circle bottom="-20px" right="-40px" size="180px" filled="true" />
        <Circle top="-40px" right="-40px" size="150px" />
        <Circle
          bottom="70px"
          right="calc(40% - 120px)"
          size="100px"
          filled="true"
        />
      </Modal>
    </Overlay>
  );
}

export default Greeting;
