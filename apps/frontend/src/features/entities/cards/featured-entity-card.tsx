import { Link } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useEventListener, useHover } from "usehooks-ts";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import { useMainStore } from "@/features/main/store";
import type { TEntityCard } from "@/lib/api/schemas/common";
import { cn } from "@/lib/utils";
import { VerticalLinesAnimation } from "@/ui/animations/vertical-lines";
import { PlayButton } from "../../../ui/buttons/play-button";

export const FeaturedEntityCard = ({
	_id,
	name,
	picture_url,
	entity,
	accent,
	...rest
}: TEntityCard) => {
	const ref = useRef<HTMLDivElement>(null);

	const width = useMainStore((state) => state.width);
	const update = useMainStore((state) => state.update);
	const { isPlaying } = useAudioPlayerContext();
	const source = useAudiobar((state) => state.source);

	const isHovered = useHover(ref);

	const isEntityPlaying = useMemo(
		() => isPlaying && source?._id === _id,
		[isPlaying, source?._id, _id],
	);

	useEventListener("mouseenter", () => update({ accent }), ref);
	useEventListener("mouseleave", () => update({ accent: "#7860e8" }), ref);

	const height = useMemo(() => {
		if (width > 1680) return "h-20";
		if (width > 1200) return "h-16";
		return "h-12";
	}, [width]);

	const href =
		"is_collection" in rest ? "/collection/tracks" : `/${entity}/${_id}`;

	return (
		<div
			className={cn([
				"flex items-center justify-between bg-white/10 rounded-[4px] gap-2 overflow-hidden pr-4 relative transition-all",
				isHovered && "bg-white/20",
				height,
			])}
			ref={ref}
		>
			<div
				className={cn([
					"flex items-center h-full gap-5",
					width <= 1200 ? "gap-2" : "gap-5",
				])}
			>
				<img
					src={`${picture_url}?w=160&h=160`}
					alt={name}
					className="object-cover aspect-[1] shadow-2xl shadow-black h-full rounded-tl-[4px] rounded-bl-[4px]"
				/>
				<p
					className={cn(["line-clamp-1 font-bold", width <= 1200 && "text-sm"])}
				>
					{name}
				</p>
			</div>
			<div className="h-full flex items-center justify-center">
				{isEntityPlaying && !isHovered && (
					<VerticalLinesAnimation wrapperProps={{ className: "absolute" }} />
				)}
				{entity !== "user" && (
					<PlayButton
						entity_id={_id}
						entity={entity}
						className={cn([
							"h-[66%] w-auto aspect-square [&_svg]:w-[60%]",
							isHovered ? "opacity-100" : "opacity-0",
						])}
					/>
				)}
			</div>
			<Link to={href} className="w-full h-full absolute top-0 left-0" />
		</div>
	);
};
