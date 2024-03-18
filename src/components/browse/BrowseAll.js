import SearchCard from "../../components/cards/SearchCard";
import { Box, Grid, Typography } from "@mui/material";
import { useGetCategoriesQuery } from "../../store/services/spotify";

export default function BrowseAll() {
  const { isLoading, data } = useGetCategoriesQuery();

  return (
    <Box>
      <Typography fontWeight="bold" variant="h6" color="white" mb={2}>
        Browse All
      </Typography>
      <Grid container spacing={2.5}>
        {!isLoading &&
          data.map((c) => (
            <Grid item lg={2.4} md={4} xs={6} key={"search-cards-" + c.title}>
              <SearchCard {...c} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
