import {
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  styled,
} from "@mui/material";
import { useState } from "react";
import {
  Clear as ClearIcon,
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  HorizontalSplit as HorizontalSplitIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleLeftMenu } from "../../../store/reducers/applicationSlice";
import { onSearch } from "../../../store/reducers/librarySlice";
import { capitalizeFirstLetter } from "../../../utils/strings";

const ChipStyled = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  "&.active": {
    backgroundColor: "white",
    color: "black",
  },
}));

const FilterButtonSX = {
  backgroundColor: "secondary.light",
  height: "32px",
  width: "32px",
  "& svg": {
    fill: "secondary.main",
  },
};

const IconButtonSX = {
  width: "32px",
  height: "32px",
  color: "secondary.main",
  transition: "0.2s ease",
  "&:hover": {
    color: "white",
  },
  "& svg": {
    fontSize: "1.3rem",
  },
};

const LibraryButton = styled(Button)(({ theme }) => ({
  padding: 0,
  color: theme.palette.secondary.main,
  fontWeight: "bold",
  fontSize: "18px",
  minWidth: "max-content",
  marginLeft: "5px",
  "&:hover": {
    backgroundColor: "transparent",
    color: "white",
  },
  "& .MuiButton-startIcon": {
    marginLeft: 0,
    "& svg": {
      fontSize: "2rem",
    },
  },
  "& svg": {
    fontSize: "2rem",
  },
  "&.shadow": {
    boxShadow: "6px 6px 10px 0 black",
    zIndex: 1,
  },
}));

const ButtonWithTooltip = ({ title, Icon }) => {
  return (
    <Tooltip title={title}>
      <IconButton sx={IconButtonSX}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

const LibraryIcon = styled(HorizontalSplitIcon)({
  transform: "rotate(270deg)",
});

const Container = styled(Grid)(({ theme }) => ({
  position: "sticky",
  top: "0",
  rowGap: "16px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.section,
  width: "calc(100% + 18px)",
  margin: "0 -9px",
  padding: "14px",
  zIndex: 1,
  boxShadow: "0px 0px 0px 0 rgba(0, 0, 0, 0)",
  transition: "box-shadow 0.2s ease",

  "&.shadow": {
    boxShadow: "6px 6px 10px 0 rgba(0, 0, 0, 1)",
  },
}));

const collapsedButtonSX = {
  padding: "14px 0",
  position: "sticky",
  top: "0",
  width: "74px",
  marginLeft: "-11px",
  backgroundColor: "section",
};

function Header({ headerShadow }) {
  const dispatch = useDispatch();

  const { leftMenuCollapsed } = useSelector((state) => state.application);
  const { _categories } = useSelector((state) => state.library);

  const [category, setCategory] = useState(null);

  function onChooseFilter(value) {
    if (category) setCategory(null);
    else setCategory(value);
    dispatch(onSearch({ categoryValue: value }));
  }

  function onToggleLeftMenu(collapse) {
    dispatch(toggleLeftMenu());
    if (collapse) {
      dispatch(onSearch({ searchValue: null }));
    }
  }

  return leftMenuCollapsed ? (
    <Tooltip title="Expand Your Library">
      <LibraryButton
        className={headerShadow ? "shadow" : ""}
        disableRipple
        onClick={() => onToggleLeftMenu(false)}
        sx={collapsedButtonSX}
      >
        <LibraryIcon />
      </LibraryButton>
    </Tooltip>
  ) : (
    <Container className={headerShadow ? "shadow" : ""}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        wrap="nowrap"
      >
        <Tooltip title="Collapse Your Library">
          <LibraryButton
            disableRipple
            startIcon={<LibraryIcon />}
            onClick={() => onToggleLeftMenu(true)}
          >
            Your Library
          </LibraryButton>
        </Tooltip>
        <Grid container columnGap={1} width="max-content">
          <ButtonWithTooltip title="Create playlist or folder" Icon={AddIcon} />
          <ButtonWithTooltip title="Show more" Icon={ArrowForwardIcon} />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={1} alignItems="center" paddingLeft="3px">
        {category && (
          <IconButton sx={FilterButtonSX} onClick={() => onChooseFilter(null)}>
            <ClearIcon />
          </IconButton>
        )}
        {category ? (
          <ChipStyled
            label={capitalizeFirstLetter(category)}
            onClick={() => onChooseFilter(null)}
            className="active"
          />
        ) : (
          _categories.map((f) => (
            <ChipStyled
              key={f}
              label={capitalizeFirstLetter(f)}
              onClick={() => onChooseFilter(f)}
            />
          ))
        )}
      </Stack>
    </Container>
  );
}

export default Header;
