import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import LeftSideMenu from "./components/leftSideMenu/LeftSideMenu";
import AudioBar from "./components/audiobar/AudioBar";
import { Outlet, useLocation } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Header from "./components/header/Header";
import { useState } from "react";
import MobileBottomMenu from "./components/MobileBottomMenu";
import NoMobileModal from "./components/NoMobileModal";

const RootContainer = styled(Box)(({ cols }) => ({
  display: "grid",
  gridTemplateColumns: cols,
  gridTemplateRows: "102px 1fr 92px",
  columnGap: "8px",
  padding: "14px 14px 0 14px",
  height: "100vh",
}));

const StyledOutletContainer = styled(Box)({
  height: "calc(100% - 56px)",
  overflow: "scroll",
  width: "calc(100% - -36px)",
  margin: "0 -18px",
  padding: "0 18px",
});

function Root({ children }) {
  const location = useLocation();

  const [homePageScrolled, setHomePageScrolled] = useState(false);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleScroll = (event) => {
    event.preventDefault();

    if (location.pathname !== "/") {
      setHomePageScrolled(false);
      return;
    }
    const top = event.currentTarget.scrollTop;
    if (top < 90) {
      setHomePageScrolled(false);
    }
    if (top > 90) {
      setHomePageScrolled(true);
    }
  };

  return (
    <RootContainer cols={sm ? "100%" : "auto 1fr"}>
      <LeftSideMenu />
      <MainContainer sx={{ padding: "18px", gridRow: "span 2" }}>
        <Header homePageScrolled={homePageScrolled} />
        <StyledOutletContainer onScroll={handleScroll}>
          {children ?? <Outlet />}
        </StyledOutletContainer>
      </MainContainer>
      {sm ? <MobileBottomMenu /> : <AudioBar />}
      {sm && <NoMobileModal />}
    </RootContainer>
  );
}

export default Root;
