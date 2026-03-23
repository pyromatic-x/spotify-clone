import { useAudiobar } from "@/features/audiobar/audiobar-store";
import { Tracks } from "@/features/tracks/standalone";
import { Button } from "@/ui/buttons/button";
import { useSidebarStore } from "../store";

export const NowPlayingNextInQueue = () => {
	const { tracks, track } = useAudiobar();
	const toggle = useSidebarStore((store) => store.toggle);

	const idx = tracks.findIndex((t) => t._id === track?._id);

	const next = idx !== -1 && tracks[idx + 1] ? tracks[idx + 1] : null;

	if (!next) return;

	return (
		<div className="rounded-[8px] overflow-hidden bg-[#1f1f1f] relative p-4">
			<div className="flex items-center justify-between mb-4">
				<p className="font-bold">Next in queue</p>
				<Button variant="link" onClick={() => toggle(1, "queue")}>
					Open queue
				</Button>
			</div>
			<Tracks tracks={[next]} />
		</div>
	);
};
