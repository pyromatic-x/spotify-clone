import { PiShuffle as ShuffleIcon } from "react-icons/pi";
import { IconButton } from "@/ui/buttons/icon-button";
import { useAudiobar } from "../../audiobar-store";

export const PlayerShuffleControl = () => {
	const shuffle = useAudiobar((state) => state.shuffle);
	const toggle = useAudiobar((state) => state.toggle);

	return (
		<IconButton
			tooltip={""}
			onClick={() => toggle("shuffle")}
			active={shuffle}
			size="md"
		>
			<ShuffleIcon />
		</IconButton>
	);
};
