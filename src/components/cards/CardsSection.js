import { Grid, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import RectangularCard from "./RectangularCard";
import { useEffect, useState } from "react";

function CardsSection({
  title,
  items = [],
  imageType,
  imageStyle,
  showAll = true,
}) {
  const theme = useTheme();

  const [itemsByWidth, setItemsByWidth] = useState(items);

  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    if (md) {
      setItemsByWidth(items.slice(0, 2));
    } else if (lg) {
      setItemsByWidth(items.slice(0, 3));
    } else if (xl) {
      setItemsByWidth(items.slice(0, 5));
    }
  }, [md, lg, xl, items]);

  return (
    <Grid container>
      <Grid container alignItems="center" justifyContent="space-between" mb={2}>
        {showAll ? (
          <Link underline="hover" fontWeight="bold" variant="h6" color="white">
            {title}
          </Link>
        ) : (
          <Typography fontWeight="bold" variant="h6" color="white">
            {title}
          </Typography>
        )}
        {showAll && (
          <Link
            color="secondary"
            fontSize="small"
            fontWeight="bold"
            underline="hover"
          >
            Show all
          </Link>
        )}
      </Grid>
      <Grid container spacing={3}>
        {itemsByWidth.map((item) => (
          <Grid
            item
            lg={2.4}
            md={4}
            xs={6}
            key={"home-section-item_" + (item.id || item.title)}
          >
            <RectangularCard
              {...item}
              imageType={imageType}
              imageStyle={imageStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default CardsSection;
