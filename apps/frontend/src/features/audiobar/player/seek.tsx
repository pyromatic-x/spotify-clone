import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useInterval } from "usehooks-ts";
import { EventBus } from "@/lib/event-bus";
import { formatDuration } from "@/lib/time";
import { Slider } from "@/ui/slider";
import { useAudiobar } from "../audiobar-store";

export const PlayerSeek = () => {
	const track = useAudiobar((state) => state.track);
	const { isPlaying, seek, getPosition, duration } = useAudioPlayerContext();

	const [position, setPosition] = useState<number>(0);
	const [seekingPosition, setSeekingPosition] = useState<number | null>(null);

	const sliderRef = useRef(null);

	const currentDuration = useMemo(() => {
		if (!track) return "-:--";
		if (seekingPosition !== null) return formatDuration(seekingPosition);
		else return formatDuration(position);
	}, [track, seekingPosition, position]);

	const handleOnChange = useCallback((value: number | number[]) => {
		setSeekingPosition(Array.isArray(value) ? value[0] : value);
	}, []);

	const handleOnChangeCommitted = () => {
		if (!seekingPosition) return;

		seek(seekingPosition);
		setPosition(seekingPosition);
		setSeekingPosition(null);
	};

	useInterval(
		() => {
			setPosition(getPosition());
		},
		isPlaying ? 250 : null,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: exhaustive
	useEffect(() => {
		const handler = () => {
			setPosition(0);
			seek(0);
		};

		const events = [
			EventBus.subscribe("playback:track-changed", handler),
			EventBus.subscribe("playback:stop", handler),
		];

		return () => {
			events.map((unsubscribe) => unsubscribe());
		};
	}, []);

	return (
		<div className="flex gap-2 items-center">
			<p className="whitespace-nowrap min-w-8 text-white/70 text-[12px] select-none">
				{currentDuration}
			</p>
			<Slider
				ref={sliderRef}
				value={[seekingPosition || position]}
				step={0.00000001}
				max={duration}
				onValueChange={handleOnChange}
				onValueCommit={handleOnChangeCommitted}
				disabled={!track}
			/>
			<p className="whitespace-nowrap min-w-8 text-white/70 text-[12px] select-none">
				{track?.duration ? formatDuration(track?.duration) : "-:--"}
			</p>
		</div>
	);
};
