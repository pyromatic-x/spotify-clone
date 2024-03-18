import {
  Box,
  Card,
  CardContent,
  CardMedia,
  SvgIcon,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { changeHomePageBackground } from "../../store/reducers/applicationSlice";
import { Favorite } from "@mui/icons-material";

import { ReactComponent as BackgroundIcon } from "../../assets/svg/widecard-bg-path.svg";
import { checkIsColorTooBright, hexToRgbA } from "../../utils/strings";
import Logo from "../../assets/icons/Logo";
import PlayButton from "../buttons/PlayButton";
import { memo } from "react";

const StyledCard = styled(Card)({
  display: "flex",
  height: "80px",
  cursor: "pointer",
  backgroundColor: "transparent",

  "& .MuiCardContent-root": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(179,179,179, 0.1)",
    transition: "0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.15);",
    },
  },

  "&:hover .MuiIconButton-root": {
    opacity: "1",
  },

  "& img": {
    maxWidth: "80px",
  },

  "& .MuiCardContent-root:last-child": {
    paddingBottom: "16px",
  },
});

const LikedSongsImage = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "80px",
  heigh: "100%",
  // background: "rgb(63,19,185)",
  background:
    "linear-gradient(135deg, rgba(63,19,185,1) 0%, rgba(124,146,135,1) 100%)",
});

const CardMediaContainer = styled(Box)({
  minWidth: "80px",
  height: "80px",
  position: "relative",
});

const CardMediaBackground = styled(SvgIcon)(({ color }) => ({
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",

  "& path": {
    fill: hexToRgbA(color, "0.85"),
  },
}));

const WideCard = memo(function WideCard({ title, image, color }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  color = color || theme.palette.background.purple;

  const isColorBright = checkIsColorTooBright(color);

  return (
    <StyledCard
      onMouseEnter={() => dispatch(changeHomePageBackground(color))}
      onMouseLeave={() => dispatch(changeHomePageBackground())}
    >
      {title === "Liked Songs" ? (
        <LikedSongsImage>
          <Favorite fontSize="large" />
        </LikedSongsImage>
      ) : (
        <CardMediaContainer sx={{ backgroundColor: color }}>
          <CardMedia
            component="img"
            src={image}
            alrt={title}
            size={100}
            height={100}
          />
          <CardMediaBackground
            component={BackgroundIcon}
            color={color}
            viewBox="0 0 80 80"
          />
          <Logo
            size="8px"
            sx={{
              display: "block",
              position: "absolute",
              top: "3px",
              left: "2px",
              "& path": { fill: isColorBright ? "black" : "" },
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              bottom: "4px",
              left: "4px",
              fontSize: "7px",
              fontWeight: "bold",
              color: isColorBright ? "black" : "",
            }}
          >
            {title}
          </Typography>
        </CardMediaContainer>
      )}
      <CardContent>
        <Typography fontWeight="bold" fontSize="0.9rem">
          {title}
        </Typography>
        <PlayButton />
      </CardContent>
    </StyledCard>
  );
});

export default WideCard;
