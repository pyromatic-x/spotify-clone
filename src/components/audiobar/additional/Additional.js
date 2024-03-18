import { Grid, useMediaQuery, useTheme } from "@mui/material";
import {
  Airplay,
  Devices,
  Lyrics,
  OpenInFull,
  QueueMusicRounded,
} from "@mui/icons-material";
import Volume from "./Volume";
import AdditionalIcon from "./AdditionalIcon";
import { useNavigate } from "react-router-dom";

function Additional() {
  const navigate = useNavigate();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      container
      flexWrap="nowrap"
      columnGap={1.35}
      width="max-content"
      justifySelf="end"
    >
      {!md && (
        <>
          <AdditionalIcon tooltip="Now Playing View" Icon={Airplay} />
          <AdditionalIcon tooltip="Lyrics" Icon={Lyrics} />
        </>
      )}
      <AdditionalIcon
        tooltip="Queue"
        Icon={QueueMusicRounded}
        onClick={() => navigate("/queue")}
      />
      {!md && <AdditionalIcon tooltip="Connect to a device" Icon={Devices} />}
      <Volume />
      {!md && <AdditionalIcon tooltip="Full screen" Icon={OpenInFull} />}
    </Grid>
  );
}

export default Additional;
