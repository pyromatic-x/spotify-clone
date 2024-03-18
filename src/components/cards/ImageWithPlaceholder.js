import { ReactComponent as BackgroundIcon } from "../../assets/svg/widecard-bg-path.svg";
import { Box, CardMedia, SvgIcon, Typography, styled } from "@mui/material";
import { useState } from "react";
import { checkIsColorTooBright, hexToRgbA } from "../../utils/strings";
import Logo from "../../assets/icons/Logo";

const Waves = styled(SvgIcon)((props) => ({
  position: "absolute",
  top: 0,
  width: "100%",
  height: "100%",

  "& path": {
    fill: hexToRgbA(props.color, "0.85"),
  },
}));

const Lines = styled(Box)((props) => ({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",

  "&::before": {
    content: "''",
    position: "absolute",
    left: "0",
    bottom: "18px",
    width: "4px",
    height: "20px",
    backgroundColor: props.color,
  },

  "&::after": {
    content: "''",
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "4px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    backgroundColor: props.color,
  },

  "& .MuiTypography-root": {
    position: "absolute",
    bottom: "16px",
    left: "12px",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
}));

function WavesBackground({ color, isColorBright, text }) {
  return (
    <>
      <Waves component={BackgroundIcon} color={color} viewBox="0 0 80 80" />
      <Logo
        size="13px"
        sx={{
          display: "block",
          position: "absolute",
          top: "6px",
          left: "6px",
          "& path": { fill: isColorBright ? "black" : "" },
        }}
      />
      <Typography
        sx={{
          position: "absolute",
          bottom: "8px",
          left: "12px",
          fontSize: "12px",
          fontWeight: "bold",
          color: isColorBright ? "black" : "",
        }}
      >
        {text}
      </Typography>
    </>
  );
}

function LinesBackground({ color, text }) {
  return (
    <Lines color={color}>
      <Typography color="white">{text}</Typography>
    </Lines>
  );
}

function Placeholder({ color, loaded, type }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
        top: "0",
        transition: "0.35s ease-out",
        opacity: loaded ? "0" : "1",
        borderRadius: type === "circle" ? "50%" : "4px",
        backgroundColor: color,
        filter: "brightness(0.5)",
      }}
    ></Box>
  );
}

function ImageWithPlaceholder({ image, text, type, style, color }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const isColorBright = checkIsColorTooBright(color);

  return (
    <Box
      sx={{
        height: 0,
        overflow: "hidden",
        paddingTop: "100%",
        marginBottom: 2,
      }}
    >
      <Placeholder color={color} loaded={imgLoaded} type={type} />
      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          borderRadius: type === "square" ? "4px" : "50%",
        }}
      >
        <CardMedia
          component="img"
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          size={200}
          height={200}
          image={image}
          lart={text}
          sx={{
            borderRadius: type === "square" ? "4px" : "50%",
            opacity: "0.85",
            aspectRatio: "1",
            transition: "0.25s ease",
            boxShadow: "0px 0px 8px 8px rgba(16, 15, 15, 0.4)",
            height: "100%",
            width: "100%",
          }}
        />
        {style === "lines" && <LinesBackground color={color} text={text} />}
        {style === "waves" && (
          <WavesBackground
            color={color}
            isColorBright={isColorBright}
            text={text}
          />
        )}
      </Box>
    </Box>
  );
}

export default ImageWithPlaceholder;
