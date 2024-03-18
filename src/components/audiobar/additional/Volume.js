import { VolumeDown, VolumeOff } from "@mui/icons-material";
import { Grid, Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { onChangeVolume } from "../../../store/reducers/playerSlice";
import AdditionalIcon from "./AdditionalIcon";

const sliderSX = {
  color: "white",
  height: 4,
  width: "80px",
  "&:hover .MuiSlider-thumb": {
    opacity: 1,
  },
  "&:hover .MuiSlider-track": {
    backgroundColor: "green.main",
    transition: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "secondary.light2",
  },
  "& .MuiSlider-track": {
    backgroundColor: "white",
    border: "none",
    transition: "none",
  },
  "& .MuiSlider-thumb": {
    opacity: 0,
    width: 12,
    height: 12,
    transition: "none",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&::after": {
      width: "18px",
      height: "18px",
    },
  },
};

function Volume() {
  const dispatch = useDispatch();
  const { volume } = useSelector((state) => state.player);

  return (
    <Grid container alignItems="center" columnGap={0.8} flexWrap="nowrap">
      {volume > 0 ? (
        <AdditionalIcon
          tooltip="Mute"
          Icon={VolumeDown}
          onClick={() => dispatch(onChangeVolume(0))}
        />
      ) : (
        <AdditionalIcon
          Icon={VolumeOff}
          onClick={() => dispatch(onChangeVolume(100))}
        />
      )}
      <Slider
        sx={sliderSX}
        defaultValue={100}
        value={volume}
        min={0}
        step={1}
        max={100}
        onChange={(_, value) => dispatch(onChangeVolume(value))}
      />
    </Grid>
  );
}

export default Volume;
