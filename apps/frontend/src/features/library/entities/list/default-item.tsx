import { useMemo } from "react";
import { IoVolumeHigh as PlayingIcon } from "react-icons/io5";
import { TiPin as PinIcon } from "react-icons/ti";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import type { TLibraryEntity } from "@/lib/api/schemas/library";
import { cn } from "@/lib/utils";
import { PlayButton } from "@/ui/buttons/play-button";
import { useLibraryStore } from "../../store";
import { getLibraryEntityDescription } from "../utils";

export const LibraryEntitiesDefaultListItem = (props: TLibraryEntity) => {
	const { entity_type, entity, pinned_at } = props;

	const { category } = useLibraryStore();
	const { isPlaying } = useAudioPlayerContext();
	const source = useAudiobar((state) => state.source);

	const isEntityPlaying = useMemo(
		() => isPlaying && source?._id === entity._id,
		[isPlaying, entity._id, source?._id],
	);

	const { title, subtitle } = getLibraryEntityDescription({
		category,
		entity: props,
	});

	return (
		<div
			className={cn([
				"flex items-center gap-1.5 w-full justify-between group py-1 pr-2",
			])}
		>
			<div className="flex gap-2">
				<div className="relative ">
					<div
						className={cn([
							"absolute top-0 left-0 w-full h-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center z-5",
							entity_type === "artist" ? "rounded-full" : "rounded-xs",
						])}
					>
						<PlayButton
							entity_id={entity._id}
							entity={entity_type}
							variant="secondary"
						/>
					</div>
					<img
						src={`${entity.picture_url}?w=96&=96`}
						alt={entity.name}
						className={cn([
							"w-12 h-12",
							entity_type === "artist" ? "rounded-full" : "rounded-xs",
						])}
					/>
				</div>
				<div className="flex flex-col justify-center">
					<p
						className={cn([
							source?._id === entity._id ? "text-primary" : "text-white",
						])}
					>
						{entity.name}
					</p>
					<p className="inline-flex gap-1.5 line-clamp-1">
						{pinned_at && <PinIcon className="text-primary" />}
						{title && (
							<span className="inline-flex gap-1.5 items-center text-sm text-[#b0b0b0]">
								{title}{" "}
								{subtitle && (
									<>
										<span className="block w-1 h-1 rounded-full bg-[#b0b0b0]" />
										{subtitle}
									</>
								)}
							</span>
						)}
					</p>
				</div>
			</div>

			{isEntityPlaying && <PlayingIcon className="text-primary" />}
		</div>
	);
};
