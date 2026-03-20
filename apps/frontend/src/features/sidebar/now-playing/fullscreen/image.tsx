import { useMemo } from "react";
import tinycolor from "tinycolor2";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import { useNowPlaying } from "@/hooks/query/use-now-playing";
import { cn } from "@/lib/utils";
import { useFullscreenStore } from "../store";

export const NowPlayingFullscreenImage = () => {
	const track = useAudiobar((state) => state.track);
	const { data: nowPlaying } = useNowPlaying();
	const image = useFullscreenStore((store) => store.image);

	const { scale, opacity, translate } = useTransition();

	const img = useMemo(() => {
		return image === "artwork"
			? `${track?.album.picture_url}?w=800&h=800`
			: `${nowPlaying?.author.backdrop_url}?h=2000&q=100`;
	}, [image, track?.album.picture_url, nowPlaying?.author.backdrop_url]);

	const color =
		image === "artwork"
			? tinycolor(nowPlaying?.album.accent).darken(15).toHexString()
			: "#121212";

	return (
		<div className="w-full h-[calc(100vh-280px)] pointer-events-none ">
			<div
				className={cn([
					"absolute top-0 left-0 w-full h-full -z-1 pointer-events-none transition-all",
				])}
				style={{
					backgroundColor: color,
				}}
			/>

			<div
				className={cn([
					"absolute left-0 h-[calc(100vh-92px)] w-full -top-14 flex items-center justify-center",
					image !== "artwork" && "overflow-hidden",
				])}
			>
				<img
					src={img}
					alt={track?.name}
					style={{ scale, opacity, translate }}
					className={cn(
						"w-auto h-[60vh] aspect-square rounded-xl shadow-2xl shadow-black/30 will-change-transform relative",
						image !== "artwork" && "hidden",
					)}
				/>
				<div
					style={{
						scale,
						opacity,
						translate,
						backgroundImage: `linear-gradient(180deg, transparent 0, rgba(0, 0, 0, .6) 100%), url(${img})`,
						backgroundPosition: "50%",
						backgroundSize: "cover",
					}}
					className={cn("w-full h-full", image !== "artist" && "hidden")}
				/>
				{image === "artwork" ? (
					<div
						className={cn([
							"absolute bottom-[-180px] left-0 w-full h-[180px] -z-1 pointer-events-none",
							image !== "artwork" && "hidden",
						])}
						style={{
							backgroundImage: `linear-gradient(in oklch to bottom, ${color}, transparent), none`,
						}}
					/>
				) : (
					<div
						className={cn([
							"absolute bottom-0 left-0 w-full h-[180px] pointer-events-none z-1",
						])}
						style={{
							backgroundImage: `linear-gradient(in oklch to top, #121212, transparent), none`,
						}}
					/>
				)}
			</div>
		</div>
	);
};

const useTransition = () => {
	const scroll = useFullscreenStore((store) => store.scroll);
	const image = useFullscreenStore((store) => store.image);

	const scale = useMemo(() => {
		const maxScroll = 180;

		const min = image === "artwork" ? 0.9 : 1;
		const max = image === "artwork" ? 1 : 1.1;

		const clamped = Math.max(0, Math.min(scroll, maxScroll));

		return max - (max - min) * (clamped / maxScroll);
	}, [scroll, image]);

	const opacity = useMemo(() => {
		const maxScroll = window.innerHeight / (image === "artwork" ? 1.5 : 2);

		const min = 0;
		const max = 1;

		const clamped = Math.max(0, Math.min(scroll, maxScroll));

		return max - (max - min) * (clamped / maxScroll);
	}, [scroll, image]);

	const translate = useMemo(() => {
		if (image === "artist") return `0px 0px`;

		const maxScroll = window.innerHeight;

		const min = 110;
		const max = 0;

		const clamped = Math.max(0, Math.min(scroll, maxScroll));

		return `0px ${max - (max - min) * (clamped / maxScroll)}%`;
	}, [scroll, image]);

	return { scale, opacity, translate };
};
