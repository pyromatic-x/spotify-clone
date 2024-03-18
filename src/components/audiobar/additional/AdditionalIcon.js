import { IconButton, Tooltip } from "@mui/material";

const IconButtonSX = {
  width: "22px",
  height: "36px",
  padding: "0px",
  "& svg": {
    fontSize: "18px",
  },
  "&:hover": {
    backgroundColor: "transparent",
    "& svg": {
      fill: "white",
    },
  },
};

function AdditionalIcon({ tooltip = null, Icon, onClick = null }) {
  return tooltip ? (
    <Tooltip title={tooltip} onClick={onClick}>
      <IconButton disableRipple sx={IconButtonSX}>
        <Icon color="secondary" />
      </IconButton>
    </Tooltip>
  ) : (
    <IconButton disableRipple sx={IconButtonSX} onClick={onClick}>
      <Icon color="secondary" />
    </IconButton>
  );
}

export default AdditionalIcon;
