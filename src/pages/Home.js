import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DailyMixes from "../components/home/DailyMixes";
import { homeSections } from "../store/mock";
import CardsSection from "../components/cards/CardsSection";

const timeOfDay = {
  morning: [6, 11],
  afternoon: [12, 17],
  evening: [18, 23],
  night: [0, 5],
};

function Home() {
  document.title = "Spotify - Home";

  const [time, setTime] = useState("");

  const hour = new Date().getHours();

  useEffect(() => {
    for (let key in timeOfDay) {
      const [start, end] = timeOfDay[key];
      if (hour >= start && hour <= end) {
        setTime(key);
        break;
      }
    }
  }, [hour]);

  return (
    <Grid position="relative" container direction="column" gap={3.5}>
      <Typography
        variant="h4"
        component="h4"
        fontWeight="bold"
        letterSpacing="-0.095rem"
      >
        Good {time}
      </Typography>
      <DailyMixes />
      {homeSections.map((s, i) => (
        <CardsSection {...s} key={"home-section-" + i} />
      ))}
    </Grid>
  );
}

export default Home;
