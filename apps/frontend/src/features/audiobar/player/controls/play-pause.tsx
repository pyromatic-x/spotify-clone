import { useEffect, useState } from "react";
import { IoMdPlayCircle as PlayIcon } from "react-icons/io";
import { IoPauseCircle as PauseIcon } from "react-icons/io5";
import { useAudioPlayerContext } from "react-use-audio-player";
import { EventBus } from "@/lib/event-bus";
import { IconButton } from "@/ui/buttons/icon-button";

export const PlayerPlayPauseControl = () => {
	const { togglePlayPause, player, src } = useAudioPlayerContext();

	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const onPlay = () => setIsPlaying(true && Boolean(src));
		const onPause = () => setIsPlaying(false);

		const listeners = [
			EventBus.subscribe("playback:play", onPlay),
			EventBus.subscribe("playback:track-changed", onPlay),
			EventBus.subscribe("playback:pause", onPause),
		];

		return () => {
			listeners.map((cleanup) => cleanup());
		};
	}, [src]);

	useEffect(() => {
		const onPause = () => setIsPlaying(false);

		player?.on("playerror", onPause);
		player?.on("loaderror", onPause);

		return () => {
			player?.off("playerror", onPause);
			player?.off("loaderror", onPause);
		};
	}, [player]);

	const tooltip = isPlaying ? "Pause" : "Play";
	const Icon = isPlaying ? PauseIcon : PlayIcon;

	return (
		<IconButton tooltip={tooltip} onClick={togglePlayPause} size="lg">
			<Icon />
		</IconButton>
	);
};
