import { useMemo } from "react";
import { IoVolumeHigh as PlayingIcon } from "react-icons/io5";
import { TiPin as PinIcon } from "react-icons/ti";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import type { TLibraryEntity } from "@/lib/api/schemas/library";
import { capitalizeFirstLetter } from "@/lib/strings";
import { cn } from "@/lib/utils";
import { useLibraryStore } from "../../store";

export const LibraryEntitiesCompactListItem = ({
	entity_type,
	entity,
	pinned_at,
}: TLibraryEntity) => {
	const { category, size } = useLibraryStore();
	const { isPlaying } = useAudioPlayerContext();
	const source = useAudiobar((state) => state.source);

	const Dot = () => (
		<span className="block w-1 h-1 rounded-full bg-[#b0b0b0]" />
	);

	const isEntityPlaying = useMemo(
		() => isPlaying && source?._id === entity._id,
		[isPlaying, entity._id, source?._id],
	);

	return (
		<p
			className={cn([
				"inline-flex items-center gap-1.5 w-full justify-between",
				size === "EXPANDED" && "pr-4",
			])}
		>
			<span className="inline-flex items-center gap-1.5 w-full">
				{pinned_at && <PinIcon className="text-primary" />}
				<span
					className={cn([
						source?._id === entity._id ? "text-primary" : "text-white",
					])}
				>
					{entity.name}
				</span>
				{!category && (
					<>
						<Dot />{" "}
						<span className="text-[#b0b0b0] text-sm">
							{capitalizeFirstLetter(entity_type)}
						</span>
					</>
				)}
				{category === "album" && "author" in entity && (
					<>
						<Dot />{" "}
						<span className="text-[#b0b0b0] text-sm">
							{capitalizeFirstLetter(entity.author.name)}
						</span>
					</>
				)}
			</span>
			{isEntityPlaying && <PlayingIcon className="text-primary" />}
		</p>
	);
};
