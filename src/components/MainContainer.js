import { Box } from "@mui/material";

function MainContainer({ children, sx = {} }) {
  return (
    <Box
      sx={{
        borderRadius: "8px",
        backgroundColor: "background.section",
        padding: "14px",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default MainContainer;
