import { Box, useMediaQuery } from "@mui/material";
import Navigation from "./Navigation";
import styled from "@emotion/styled";
import Library from "./yourLibrary/Library";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLeftMenu } from "../../store/reducers/applicationSlice";
import { useTheme } from "@emotion/react";

const Container = styled(Box)({
  width: "340px",
  maxWidth: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  height: "100%",
});

const LeftSideMenu = memo(function LeftSideMenu() {
  const dispatch = useDispatch();

  const [hideMenu, setHideMenu] = useState(false);

  const leftMenuCollapsed = useSelector(
    (state) => state.application.leftMenuCollapsed
  );

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (md && !leftMenuCollapsed) {
      dispatch(toggleLeftMenu(false));
    }
    if (sm && !hideMenu) {
      setHideMenu(true);
    }
    if (!sm && hideMenu) {
      setHideMenu(false);
    }
  }, [md, sm, leftMenuCollapsed, hideMenu, dispatch]);

  return (
    <Container
      sx={{
        gridRow: "span 2",
        display: hideMenu ? "none !important" : "flex",
        width: leftMenuCollapsed ? "74px !important" : "340px",
      }}
    >
      <Navigation />
      <Library />
    </Container>
  );
});

export default LeftSideMenu;
