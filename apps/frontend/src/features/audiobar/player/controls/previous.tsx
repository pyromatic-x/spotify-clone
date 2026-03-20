import { MdSkipPrevious as PreviousIcon } from "react-icons/md";
import { useAudioPlayerContext } from "react-use-audio-player";
import { IconButton } from "@/ui/buttons/icon-button";
import { useAudiobar } from "../../audiobar-store";

export const PlayerPrevControl = () => {
	const prev = useAudiobar((state) => state.prev);
	const { getPosition, seek } = useAudioPlayerContext();

	const handleOnClick = () => {
		if (getPosition() > 5) seek(0);
		else prev();
	};

	return (
		<IconButton tooltip="Previous" onClick={handleOnClick} size="xl">
			<PreviousIcon />
		</IconButton>
	);
};
