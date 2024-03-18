import {
  Grid,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material/";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import QueueCategories from "./QueueCategories";

const Btn = styled(IconButton)({
  backgroundColor: "black",
  width: "35px",
  height: "35px",

  "& svg": {
    fontSize: "1.2rem",
  },
});

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      columnGap={0.5}
      flexWrap="nowrap"
      width="max-content"
      alignItems="center"
    >
      <Btn onClick={() => navigate(-1)} disabled={location.key === "default"}>
        <ArrowBackIosNew />
      </Btn>
      <Btn onClick={() => navigate(1)}>
        <ArrowForwardIos />
      </Btn>
      {!sm && location.pathname === "/search" && <Search />}
      {!sm && location.pathname === "/queue" && <QueueCategories />}
    </Grid>
  );
}

export default Navigation;
