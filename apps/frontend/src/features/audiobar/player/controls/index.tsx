import { PlayerNextControl } from "./next";
import { PlayerPlayPauseControl } from "./play-pause";
import { PlayerPrevControl } from "./previous";
import { PlayerRepeatControl } from "./repeat";
import { PlayerShuffleControl } from "./shuffle";

export const PlayerControls = () => {
	return (
		<div className="flex items-center place-content-center gap-1.5 flex-wrap">
			<PlayerShuffleControl />
			<PlayerPrevControl />
			<PlayerPlayPauseControl />
			<PlayerNextControl />
			<PlayerRepeatControl />
		</div>
	);
};
