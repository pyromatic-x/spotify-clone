import { Box, Card, CardContent, Typography, styled } from "@mui/material";
import PlayButton from "../buttons/PlayButton";
import { memo } from "react";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  padding: "18px",
  backgroundColor: theme.palette.background.card,
  transition: "0.25s ease",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: theme.palette.background.cardHover,

    "& .MuiIconButton-root": {
      opacity: "1",
    },
  },
}));

const TextTruncated = styled(Typography)(({ lines }) => ({
  display: "-webkit-box",
  WebkitLineClamp: lines || "2",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

const RectangularCard = memo(function RectangularCard({
  image,
  imageType = "square",
  imageStyle,
  color,
  title,
  subTitle,
}) {
  return (
    <StyledCard>
      <Box position="relative">
        <ImageWithPlaceholder
          image={image}
          text={title}
          type={imageType}
          style={imageStyle}
          color={color}
        />
        <PlayButton
          sx={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            transition: "0.3s ease",
            zIndex: "1",
          }}
        />
      </Box>
      <CardContent sx={{ padding: "0", "&:last-child": { padding: "0" } }}>
        <TextTruncated fontWeight="bold" lines="1">
          {title}
        </TextTruncated>
        {subTitle && (
          <TextTruncated color="secondary" fontSize="small">
            {subTitle}
          </TextTruncated>
        )}
      </CardContent>
    </StyledCard>
  );
});

export default RectangularCard;
