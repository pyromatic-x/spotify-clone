import { PlayerControls } from "./controls";
import { PlayerSeek } from "./seek";

export const AudiobarPlayer = () => (
	<div className="flex flex-col gap-0.5 max-w-[722px] w-[40%]">
		<PlayerControls />
		<PlayerSeek />
	</div>
);
