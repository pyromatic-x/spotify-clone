import { GiMicrophone as LyricsIcon } from "react-icons/gi";
import { IconButton } from "@/ui/buttons/icon-button";

export const PlayerLyricsSwitch = () => {
	return (
		<IconButton tooltip="" disabled size="sm">
			<LyricsIcon size="20px" />
		</IconButton>
	);
};
