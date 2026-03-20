import { Link, useLocation } from "@tanstack/react-router";
import { useMemo } from "react";
import { IoVolumeHigh as PlayingIcon } from "react-icons/io5";
import { TiPin as PinIcon } from "react-icons/ti";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import type { TLibraryEntity } from "@/lib/api/schemas/library";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { useLibraryStore } from "../../store";
import { getLibraryEntityDescription } from "../utils";

export function LibraryEntitiesCompactGridItem({
	entity,
}: {
	entity: TLibraryEntity;
}) {
	const {
		entity_type,
		pinned_at,
		entity: { _id, picture_url, name },
	} = entity;

	const { isPlaying } = useAudioPlayerContext();
	const source = useAudiobar((state) => state.source);
	const { category } = useLibraryStore();
	const { pathname } = useLocation();

	const isEntityPlaying = useMemo(
		() => isPlaying && source?._id === _id,
		[isPlaying, _id, source?._id],
	);

	const { subtitle } = getLibraryEntityDescription({
		category,
		entity,
	});

	const isOpened = pathname.startsWith(`/${entity.entity_type}/${_id}`);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				{/* @ts-expect-error TODO */}
				<Link to={`/${entity.entity_type}/${_id}`}>
					<div
						className="p-2 hover:bg-[#1f1f1f] rounded-[6px] data-[opened=true]:bg-[#2a2a2a] hover:data-[opened=true]:bg-[#484848]"
						data-opened={isOpened}
					>
						<img
							src={`${picture_url}?w=350&h=350`}
							alt={name}
							className={cn([
								"w-full h-full object-cover shadow-md shadow-black/40",
								entity_type === "artist" ? "rounded-full" : "rounded-[6px]",
							])}
						/>
					</div>
				</Link>
			</TooltipTrigger>
			<TooltipContent
				side="right"
				align="center"
				className="flex items-center gap-4"
			>
				<div className="flex flex-col">
					<p>{name}</p>
					<p className="inline-flex items-center gap-1.5 text-[#b0b0b0]">
						{pinned_at && <PinIcon className="text-primary" />}{" "}
						<span>{subtitle}</span>
					</p>
				</div>
				{isEntityPlaying && <PlayingIcon className="text-primary" size={18} />}
			</TooltipContent>
		</Tooltip>
	);
}
