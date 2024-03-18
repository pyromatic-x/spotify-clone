import {
  Box,
  Grid,
  List,
  ListItem,
  Skeleton,
  Typography,
  styled,
} from "@mui/material";
import Search from "./Search";
import { useSelector } from "react-redux";
import LibraryListItem from "./LibraryListItem";
import { createSelector } from "@reduxjs/toolkit";
import {
  useGetAlbumsQuery,
  useGetArtistsQuery,
  useGetPlaylistsQuery,
} from "../../../store/services/spotify";

const StyledList = styled(List)({
  width: "100%",
  padding: 0,
});

function NoResults({ searchValue }) {
  return (
    <Grid
      justifyContent="center"
      direction="column"
      container
      marginTop="150px"
    >
      <Typography
        variant="h6"
        component="h6"
        fontWeight="bold"
        textAlign="center"
        noWrap
        sx={{
          display: "inline-flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="span">Couldn't find "</Typography>
        <Typography
          variant="span"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: "140px",
            display: "inline-block",
          }}
        >
          {searchValue}
        </Typography>
        <Typography variant="span">"</Typography>
      </Typography>
      <Typography textAlign="center" variant="subtitle2">
        Try searching again using a different spelling or keyword.
      </Typography>
    </Grid>
  );
}

function Loading({ leftMenuCollapsed }) {
  return (
    <List disablePadding>
      {Array.from(Array(15).keys()).map((t) => (
        <ListItem
          key={t}
          sx={{ padding: leftMenuCollapsed ? "4px 5px" : "4px 8px" }}
        >
          <Grid container flexWrap="nowrap" alignItems="center">
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ minWidth: "48px" }}
              height={48}
            />
            {!leftMenuCollapsed && (
              <Grid container direction="column" ml={1}>
                <Skeleton animation="wave" height={20} width="60%" />
                <Skeleton animation="wave" height={20} width="80%" />
              </Grid>
            )}
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}

function LibraryList({ headerShadow, setHeaderShadow }) {
  useGetAlbumsQuery();
  useGetArtistsQuery();
  useGetPlaylistsQuery();

  const selectLoading = (state) => state.library.loading;
  const selectFilters = (state) => state.library.filters;
  const selectFilteredItems = (state) => state.library.filtered;
  const selectIsMenuCollapsed = (state) => state.application.leftMenuCollapsed;

  const selector = createSelector(
    [selectLoading, selectFilters, selectFilteredItems, selectIsMenuCollapsed],
    (loading, filters, items, leftMenuCollapsed) => {
      return {
        loading,
        searchValue: filters.search,
        category: filters.category,
        items,
        leftMenuCollapsed,
      };
    }
  );

  const { loading, searchValue, category, items, leftMenuCollapsed } =
    useSelector(selector);

  const handleScroll = (event) => {
    const top = event.currentTarget.scrollTop;

    if (headerShadow && top < 1) {
      setHeaderShadow(false);
    }
    if (!headerShadow && top > 1) {
      setHeaderShadow(true);
    }
  };

  return (
    <Box
      sx={{
        overflowY: "scroll",
        width: "calc(100% + 18px)",
        margin: "0 -9px",
        padding: "0 6px 6px 6px",
      }}
      onScroll={(e) => handleScroll(e)}
    >
      <Search />
      {loading ? (
        <Loading leftMenuCollapsed={leftMenuCollapsed} />
      ) : items.length ? (
        <StyledList>
          {items.map((t) => (
            <LibraryListItem
              {...t}
              key={t.name || t.title}
              leftMenuCollapsed={leftMenuCollapsed}
              showDescription={!!category || !!searchValue}
            />
          ))}
        </StyledList>
      ) : (
        <NoResults searchValue={searchValue} />
      )}
    </Box>
  );
}

export default LibraryList;
