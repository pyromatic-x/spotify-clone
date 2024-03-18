import SearchCard from "../cards/SearchCard";
import { Box, Grid, Typography } from "@mui/material";

export default function BrowseAll() {
  return (
    <Box>
      <Typography fontWeight="bold" variant="h6" color="white" mb={2}>
        Browse All
      </Typography>
      <Grid container spacing={2.5}>
        {true &&
          [].map((c: any) => (
            <Grid item lg={2.4} md={4} xs={6} key={"search-cards-" + c.title}>
              <SearchCard {...c} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
