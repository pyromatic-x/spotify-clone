import {
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Notifications, Groups, Person } from "@mui/icons-material";

const buttonSX = {
  backgroundColor: "rgba(4, 4, 4, 1)",
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.15)",
    "& svg": {
      fill: "white",
    },
  },
};

const Btn = (Icon, title) => (
  <Tooltip title={title} placement="bottom">
    <IconButton sx={buttonSX} disableRipple>
      <Icon sx={{ fontSize: "1.2rem" }} color="secondary" />
    </IconButton>
  </Tooltip>
);

function Menu() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container position="relative" width="max-content" columnGap={1}>
      {!sm && (
        <>
          {Btn(Notifications, "What's New")}
          {Btn(Groups, "Friend Activity")}
        </>
      )}
      {Btn(Person, "Profile")}
    </Grid>
  );
}

export default Menu;
