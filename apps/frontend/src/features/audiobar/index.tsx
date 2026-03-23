import { AudiobarPlayer } from "./player";
import { AudiobarSwitchers } from "./switchers";
import { AudiobarTrack } from "./track";
import { AudiobarTrackWatcher } from "./track-watcher";

export const AudiobarModule = () => {
	return (
		<div
			className="flex w-full items-center justify-between px-2 [grid-area:audiobar]"
			style={{
				gridTemplateColumns: "minmax(225px, auto) minmax(290px, 680px) auto",
			}}
		>
			<AudiobarTrack />
			<AudiobarPlayer />
			<AudiobarSwitchers />
			<AudiobarTrackWatcher />
		</div>
	);
};
