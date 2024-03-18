import { Grid, styled } from "@mui/material";
import Navigation from "./Navigation";
import Menu from "./Menu";
import HeaderBackground from "./HeaderBackground";

const StyledHeader = styled(Grid)(({ theme, addbackground }) => ({
  position: "relative",
  margin: "0 -18px",
  marginTop: "-18px",
  width: "calc(100% - -36px)",
  padding: "18px",
  background:
    addbackground === "true"
      ? theme.palette.background.purple
      : "rgba(0, 0, 0, 0)",
  borderTopRightRadius: "8px",
  borderTopLeftRadius: "8px",
  transition: "0.5s ease",
}));

function Header({ homePageScrolled }) {
  return (
    <StyledHeader
      component="header"
      container
      alignItems="center"
      justifyContent="space-between"
      wrap="nowrap"
      addbackground={homePageScrolled.toString()}
    >
      <HeaderBackground homePageScrolled={homePageScrolled} />
      <Navigation />
      <Menu />
    </StyledHeader>
  );
}

export default Header;
