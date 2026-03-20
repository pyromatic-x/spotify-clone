import { PiRepeat as RepeatIcon } from "react-icons/pi";
import { IconButton } from "@/ui/buttons/icon-button";
import { useAudiobar } from "../../audiobar-store";

export const PlayerRepeatControl = () => {
	const repeat = useAudiobar((state) => state.repeat);
	const toggle = useAudiobar((state) => state.toggle);

	return (
		<IconButton
			tooltip={""}
			onClick={() => toggle("repeat")}
			active={repeat}
			size="md"
		>
			<RepeatIcon />
		</IconButton>
	);
};
