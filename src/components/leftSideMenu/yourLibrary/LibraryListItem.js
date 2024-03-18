import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material";
import { capitalizeFirstLetter } from "../../../utils/strings";
import { memo } from "react";

const hoverStyles = (bgColor) => {
  return {
    "&": {
      borderRadius: "6px",
      cursor: "pointer",
    },
    "&:hover": {
      backgroundColor: bgColor,
    },
  };
};

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: "4px 8px",
  minHeight: "62px",

  "& .MuiListItemText-primary": {
    fontSize: "0.95rem",
  },
  "& .MuiListItemText-secondary": {
    fontSize: "0.8rem",
  },
  ...hoverStyles(theme.palette.secondary.light),
}));

const StyledListItemCollapsed = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  paddingLeft: "5px",
  paddingRight: "5px",
  ...hoverStyles(theme.palette.secondary.light),
}));

const StyledAvatar = styled(Avatar)((props) => ({
  borderRadius: props.type === "square" ? "6px" : "50%",
}));

const LibraryListItem = memo(function LibraryListItem({
  author,
  title,
  subTitle,
  image,
  type,
  leftMenuCollapsed,
  showDescription,
}) {
  const secondaryText = showDescription
    ? author
    : capitalizeFirstLetter(type.slice(0, -1));

  return leftMenuCollapsed ? (
    <StyledListItemCollapsed>
      <StyledAvatar
        alt={author}
        src={image}
        sx={{ width: 48, height: 48 }}
        width={48}
        height={48}
        type={type === "artists" ? "circle" : "square"}
      />
    </StyledListItemCollapsed>
  ) : (
    <StyledListItem>
      <ListItemAvatar sx={{ minWidth: "auto" }}>
        <StyledAvatar
          alt={author || subTitle}
          src={image}
          sx={{ width: 48, height: 48 }}
          width={48}
          height={48}
          type={type === "artists" ? "circle" : "square"}
        />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={secondaryText}
        sx={{ marginLeft: "12px" }}
      />
    </StyledListItem>
  );
});

export default LibraryListItem;
