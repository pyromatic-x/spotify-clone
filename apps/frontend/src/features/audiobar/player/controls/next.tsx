import { MdSkipNext as NextIcon } from "react-icons/md";
import { useAudioPlayerContext } from "react-use-audio-player";
import { IconButton } from "@/ui/buttons/icon-button";
import { useAudiobar } from "../../audiobar-store";

export const PlayerNextControl = () => {
	const next = useAudiobar((state) => state.next);
	const { stop } = useAudioPlayerContext();

	const handleOnClick = () => {
		stop();
		next();
	};

	return (
		<IconButton tooltip="Next" onClick={handleOnClick} size="xl">
			<NextIcon />
		</IconButton>
	);
};
