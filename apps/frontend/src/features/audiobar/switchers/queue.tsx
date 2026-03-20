import { HiOutlineQueueList as QueueIcon } from "react-icons/hi2";
import { useSidebarStore } from "@/features/sidebar/store";
import { IconButton } from "@/ui/buttons/icon-button";

export const PlayerQueueSwitch = () => {
	const layers = useSidebarStore((state) => state.layers);
	const toggle = useSidebarStore((state) => state.toggle);

	return (
		<IconButton
			tooltip="Queue"
			size="sm"
			onClick={() => toggle(1, "queue")}
			active={layers[1] === "queue"}
		>
			<QueueIcon size="20px" />
		</IconButton>
	);
};
