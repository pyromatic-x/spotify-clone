import { PiDevices as DevicesIcon } from "react-icons/pi";
import { useSidebarStore } from "@/features/sidebar/store";
import { IconButton } from "@/ui/buttons/icon-button";

export const PlayerDevicesSwitch = () => {
	const layers = useSidebarStore((state) => state.layers);
	const toggle = useSidebarStore((state) => state.toggle);

	return (
		<IconButton
			tooltip="Connect to a device"
			size="sm"
			onClick={() => toggle(1, "devices")}
			active={layers["1"] === "devices"}
		>
			<DevicesIcon size="20px" />
		</IconButton>
	);
};
