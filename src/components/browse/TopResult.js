import { Avatar, Card, Chip, Grid, Typography, styled } from "@mui/material";
import { capitalizeFirstLetter } from "../../utils/strings";
import PlayButton from "../buttons/PlayButton";

const StyledContainer = styled(Card)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.secondary.dark,
  padding: "20px",
  borderRadius: "4px",
  transition: "0.25s ease",
  cursor: "pointer",
  maxWidth: "400px",
  position: "relative",

  "&:hover": {
    backgroundColor: theme.palette.secondary.light,

    "& .top-result-play-button": {
      opacity: "1",
    },
  },
}));

const titleSX = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  maxWidth: "15vw",
};

function TopResult({ item }) {
  return (
    <Grid item lg={4} md={12}>
      <Typography fontWeight="bold" variant="h6" color="white" mb={2}>
        Top Result
      </Typography>
      <StyledContainer>
        <Avatar
          variant="circular"
          sx={{
            width: "90px",
            height: "90px",
            marginBottom: "1rem",
            boxShadow: "0px 0px 14px 10px rgba(0, 0, 0, 0.4)",
          }}
          src={item.image}
          alt={item.title || item.name}
        />
        <Typography fontWeight="bold" fontSize="1.1rem" mb={1} sx={titleSX}>
          {item.title || item.name}
        </Typography>
        {item.type && (
          <Chip
            label={capitalizeFirstLetter(item.type)}
            sx={{ backgroundColor: "secondary.dark" }}
          />
        )}
        <PlayButton
          className={"top-result-play-button"}
          sx={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            transition: "0.3s ease",
          }}
        />
      </StyledContainer>
    </Grid>
  );
}

export default TopResult;
