import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Background = styled(Box)((props) => ({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "250px",
  opacity: props.remove === "true" ? "0" : "0.8",
  transition: "1s ease-in-out",
  borderRadius: "8px",
  pointerEvents: "none",

  "&::before": {
    content: "''",
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(18,18,18,1) 100%)",
  },
}));

function HeaderBackground({ homePageScrolled }) {
  const location = useLocation();
  const color = useSelector((state) => state.application.homePageBackground);

  return (
    location.pathname === "/" && (
      <Background bgcolor={color} remove={homePageScrolled.toString()} />
    )
  );
}

export default HeaderBackground;
