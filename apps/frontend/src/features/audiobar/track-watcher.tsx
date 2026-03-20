import { useEffect, useRef } from "react";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useQueue } from "@/hooks/query/use-queue";
import { EventBus } from "@/lib/event-bus";
import { useAudiobar } from "./audiobar-store";

export const AudiobarTrackWatcher = () => {
	const { data: queue } = useQueue();
	const { load, volume } = useAudioPlayerContext();

	const initial = useRef(true);

	const init = useAudiobar((state) => state.init);
	const track = useAudiobar((state) => state.track);
	const next = useAudiobar((state) => state.next);

	// biome-ignore lint/correctness/useExhaustiveDependencies: exhaustive
	useEffect(() => {
		if (queue) init(queue);
	}, [queue]);

	useEffect(() => {
		initial.current = false;
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: exhaustive
	useEffect(() => {
		if (track) {
			load(track.audio_url, {
				initialVolume: volume,
				autoplay: !initial.current,
				format: "mp3",
				html5: true,
				onend: next,
				onplay: () => EventBus.emit("playback:play", track),
				onpause: () => EventBus.emit("playback:pause", track),
				onstop: () => EventBus.emit("playback:stop", track),
			});
		}
	}, [track]);

	return null;
};
