import {
	RiFullscreenExitLine as CloseIcon,
	RiFullscreenLine as OpenIcon,
} from "react-icons/ri";
import { useSidebarStore } from "@/features/sidebar/store";
import { IconButton } from "@/ui/buttons/icon-button";

export const PlayerFullscreenSwitch = () => {
	const layers = useSidebarStore((state) => state.layers);
	const toggle = useSidebarStore((state) => state.toggle);

	const Icon = layers[2] === "now-playing-fullscreen" ? CloseIcon : OpenIcon;

	return (
		<IconButton
			tooltip="Enter Full screen"
			size="sm"
			onClick={() => toggle(2, "now-playing-fullscreen")}
		>
			<Icon size="20px" />
		</IconButton>
	);
};
