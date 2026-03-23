import { Link } from "@tanstack/react-router";
import { useMemo, useRef } from "react";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useHover } from "usehooks-ts";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import type { TEntityCard } from "@/lib/api/schemas/common";
import { cn } from "@/lib/utils";
import { PlayButton } from "@/ui/buttons/play-button";

type TProps = TEntityCard & {
	responsive?: boolean;
};

export const EntityCard = (props: TProps) => {
	const { _id, picture_url, name, entity, accent, responsive = false } = props;

	const ref = useRef<HTMLDivElement>(null);
	const isHovered = useHover(ref);
	const source = useAudiobar((state) => state.source);
	const { isPlaying } = useAudioPlayerContext();

	const isEntityPlaying = useMemo(
		() => isPlaying && source?._id === _id,
		[isPlaying, source?._id, _id],
	);

	const description = useMemo(() => {
		if (entity === "artist") return "Artist";
		if (entity === "album") return props.author.name;
		if (entity === "user") return "Profile";
		if ("description" in props) return props.description;
	}, [entity, props]);

	return (
		<div
			className={cn([
				"relative cursor-pointer p-3 hover:bg-white/10 rounded-[6px]",
				responsive ? "w-full" : "w-55",
			])}
			ref={ref}
		>
			<Link
				to={`/${entity}/${_id}` as string}
				params={{ id: _id }}
				className="absolute top-0 left-0 w-full h-full z-1"
			/>
			<div className="relative mb-2">
				<img
					src={`${picture_url}?w=320&h=320`}
					alt={name}
					className={cn([
						"w-full h-full aspect-square object-cover shadow-xl shadow-black/40",
						entity === "artist" || entity === "user"
							? "rounded-full"
							: "rounded-[6px]",
					])}
					style={{ background: accent }}
				/>
				{entity !== "user" && (
					<div
						className={cn([
							"absolute bottom-0 right-3 opacity-0 transition-all duration-450",
							(isHovered || isEntityPlaying) && "opacity-100 bottom-3",
						])}
					>
						<PlayButton
							entity_id={_id}
							entity={entity}
							className="relative z-2"
						/>
					</div>
				)}
			</div>
			<p className="text-white relative z-1 line-clamp-2">{name}</p>
			<p className="text-[#b3b3b3] text-sm line-clamp-2">{description}</p>
		</div>
	);
};
