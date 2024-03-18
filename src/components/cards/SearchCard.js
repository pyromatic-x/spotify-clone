import styled from "@emotion/styled";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const StyledCard = styled(Card)((props) => ({
  aspectRatio: "1",
  position: "relative",
  cursor: "pointer",
  backgroundColor: props.color,

  "& .MuiCardMedia-root": {
    position: "absolute",
    right: "-5%",
    bottom: "-5%",
    height: "50%",
    width: "50%",
    transform: "rotate(30deg)",
    borderRadius: "6px",
  },
}));

function SearchCard({ title, image, color }) {
  return (
    <StyledCard color={color}>
      <CardMedia
        component="img"
        src={image}
        alt={title}
        width={100}
        height={100}
      />
      <CardContent>
        <Typography fontWeight="bold" variant="h6">
          {title}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

export default SearchCard;
