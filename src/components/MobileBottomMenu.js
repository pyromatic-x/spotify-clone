import {
  HomeOutlined as HomeOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  HorizontalSplit as LibraryIcon,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

function MobileBottomMenu() {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      flexWrap="nowrap"
      padding="0 14px"
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        width="max-content"
      >
        <HomeOutlinedIcon />
        <Typography fontSize="small">Home</Typography>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        width="max-content"
      >
        <SearchOutlinedIcon />
        <Typography fontSize="small">Search</Typography>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        width="max-content"
      >
        <LibraryIcon sx={{ transform: "rotate(270deg)" }} />
        <Typography fontSize="small">Your library</Typography>
      </Grid>
    </Grid>
  );
}

export default MobileBottomMenu;
