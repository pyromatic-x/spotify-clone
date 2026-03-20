import { PlayerDevicesSwitch } from "./devices";
import { PlayerFullscreenSwitch } from "./fullscreen";
import { PlayerLyricsSwitch } from "./lyrics";
import { PlayerQueueSwitch } from "./queue";
import { PlayerVolumeSwitch } from "./volume";

export const AudiobarSwitchers = () => (
	<div className="flex items-center gap-2 justify-end flex-nowrap min-w-[180px] w-[30%]">
		<PlayerLyricsSwitch />
		<PlayerQueueSwitch />
		<PlayerDevicesSwitch />
		<PlayerVolumeSwitch />
		<PlayerFullscreenSwitch />
	</div>
);
