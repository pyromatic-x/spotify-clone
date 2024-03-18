import {
  Box,
  Button,
  Grid,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";

import vinylImage from "../assets/images/vinyl.png";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.white,
  width: "max-content",
  padding: "6px 20px",

  "&:hover": {
    backgroundColor: theme.palette.secondary.light2,
  },
}));

export default function Error() {
  document.title = "Spotify - Error";

  const navigate = useNavigate();
  const error = useRouteError();

  console.error(error);

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      columnGap={10}
      paddingX={3}
      flexWrap="nowrap"
      direction={md ? "column-reverse" : "row"}
      height="100%"
    >
      <Grid item container alignItems="center" direction="column" lg={6}>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          {(error.status || "error") + "s "} and heartbreaks
        </Typography>
        <Typography textAlign="center" mb={4}>
          Oops! Looks like something went wrong on our end. <br /> Maybe our FAQ
          or Community can help?
        </Typography>
        <StyledButton disableRipple onClick={() => navigate(-1)}>
          GO BACK
        </StyledButton>
      </Grid>
      <Grid item lg={6}>
        <Box
          component="img"
          src={vinylImage}
          alrt={"Error Page Image"}
          mb={md ? 4 : 0}
          width={md ? 200 : "100%"}
          height={md ? 200 : "100%"}
          maxWidth="550px"
        ></Box>
      </Grid>
    </Grid>
  );
}
