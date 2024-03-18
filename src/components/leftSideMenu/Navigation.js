import {
  HomeOutlined,
  Home,
  SearchOutlined,
  YoutubeSearchedFor,
} from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MainContainer from "../MainContainer";
import { useSelector } from "react-redux";
import { memo } from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "0",
  minWidth: "max-content",
  "& span": {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    textAlign: "start",
    transition: "0.3s ease",
  },
  "& svg": {
    fill: theme.palette.secondary.main,
    transition: "0.3s ease",
    fontSize: "2rem",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "max-content",
  },

  "& .MuiTypography-root": {
    marginLeft: "10px",
  },

  "&:hover, &.active": {
    backgroundColor: "transparent",
    "& span": {
      color: "white",
    },
    "& svg": {
      fill: "white",
    },
  },
}));

StyledButton.defaultProps = {
  disableRipple: true,
};

const LinkStyled = styled(Link)({
  width: "100%",
});

function Item({ Icon, IconActive, isActive, text, path, isCollapsed }) {
  return (
    <ListItem disablePadding>
      <LinkStyled to={path}>
        <StyledButton className={isActive ? "active" : ""}>
          <ListItemIcon>{isActive ? <IconActive /> : <Icon />}</ListItemIcon>
          {!isCollapsed && <ListItemText primary={text} />}
        </StyledButton>
      </LinkStyled>
    </ListItem>
  );
}

const Navigation = memo(function Navigation() {
  const leftMenuCollapsed = useSelector(
    (state) => state.application.leftMenuCollapsed
  );
  const { pathname } = useLocation();

  return (
    <MainContainer
      sx={{
        display: "flex",
        justifyContent: "start",
      }}
    >
      <List
        disablePadding
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginLeft: "7px",
        }}
      >
        <Item
          Icon={HomeOutlined}
          IconActive={Home}
          isActive={pathname === "/"}
          text="Home"
          path="/"
          isCollapsed={leftMenuCollapsed}
        />
        <Item
          Icon={SearchOutlined}
          IconActive={YoutubeSearchedFor}
          isActive={pathname === "/search"}
          text="Search"
          path="/search"
          isCollapsed={leftMenuCollapsed}
        />
      </List>
    </MainContainer>
  );
});

export default Navigation;
