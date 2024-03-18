import styled from "@emotion/styled";
import {
  Cancel,
  FormatListBulleted,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSearch } from "../../../store/reducers/librarySlice";
import { capitalizeFirstLetter } from "../../../utils/strings";

const SearchContainer = styled(FormControl)({
  transition: "0.2s ease",
  width: "190px",
  opacity: "1",
  pointerEvents: "all",
  position: "absolute",

  "&.hidden": {
    width: "0px",
    opacity: "0",
    pointerEvents: "none",
  },
});

const StyledSearchInput = styled(TextField)({
  backgroundColor: "#292828",
  border: "none",
  borderRadius: "6px",
  maxWidth: "190px",

  "& .MuiInputBase-root": {
    height: "32px",
    borderRadius: "6px",
    padding: "0 5px",
  },

  "& svg": {
    fontSize: "1.3rem",
  },

  "& .MuiInputBase-input": {
    fontSize: "0.8rem",
  },

  "& .MuiInputAdornment-positionEnd svg": {
    cursor: "pointer",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const StyledSortButton = styled(Button)({
  padding: "0",
  fontSize: "0.8rem",

  "&:hover": {
    backgroundColor: "transparent",
    color: "#ffffff",
  },

  "& .MuiButton-endIcon": {
    marginLeft: "6px",
  },
});

const StyledSearchButton = styled(IconButton)({
  padding: "0",
  minWidth: "auto",
  width: "31px",
  height: "32px",
  opacity: "1",
  pointerEvents: "all",
  transition: "0.2s ease",

  "& svg": {
    fontSize: "1.3rem",
  },

  "&.hidden": {
    opacity: "0",
    pointerEvents: "none",
  },
});

function Search() {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.library.filters);
  const { leftMenuCollapsed } = useSelector((state) => state.application);

  const [searchOpened, setSeachOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchRef = useRef(null);

  function closeSearchByOutsideClick() {
    setSeachOpened(false);
    setSearchValue("");
  }

  useEffect(() => {
    if (leftMenuCollapsed) {
      setSeachOpened(false);
      setSearchValue("");
    }

    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !searchValue &&
        searchOpened
      ) {
        closeSearchByOutsideClick();
      }
    }

    dispatch(onSearch({ searchValue: searchValue || null }));

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchValue, leftMenuCollapsed, searchRef, dispatch, searchOpened]);

  return leftMenuCollapsed ? null : (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      marginBottom={1.5}
      paddingLeft={1.5}
      paddingRight={1.5}
      position="relative"
    >
      <StyledSearchButton
        className={searchOpened ? "hidden" : ""}
        onClick={() => setSeachOpened(true)}
      >
        <SearchIcon />
      </StyledSearchButton>
      <SearchContainer className={searchOpened ? "" : "hidden"}>
        <StyledSearchInput
          ref={searchRef}
          size="small"
          variant="outlined"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          inputProps={{ maxLength: 30 }}
          placeholder={`Search in ${
            category ? capitalizeFirstLetter(category) : "Library"
          }`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment
                position="end"
                style={{ display: false }}
                onClick={() => setSearchValue("")}
              >
                <Cancel />
              </InputAdornment>
            ),
          }}
        />
      </SearchContainer>
      <StyledSortButton
        disableRipple
        endIcon={<FormatListBulleted />}
        color="secondary"
      >
        Recents
      </StyledSortButton>
    </Grid>
  );
}

export default Search;
