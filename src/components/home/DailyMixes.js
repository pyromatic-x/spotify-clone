import { Grid } from "@mui/material";
import { homeMixes } from "../../store/mock";
import WideCard from "../cards/WideCard";

function DailyMixes() {
  return (
    <Grid container spacing={1.5}>
      {homeMixes.map((t, i) => (
        <Grid item lg={4} md={6} sm={6} xs={12} key={t + i}>
          <WideCard {...t} />
        </Grid>
      ))}
    </Grid>
  );
}

export default DailyMixes;
