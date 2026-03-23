import { Link } from "@tanstack/react-router";
import { IoVolumeHigh as PlayingIcon } from "react-icons/io5";
import { TiPin as PinIcon } from "react-icons/ti";
import { useAudioPlayerContext } from "react-use-audio-player";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { useLibraryStore } from "../store";
import { getLibraryEntityDescription } from "./utils";

export function LibraryEntitiesCollapsed() {
	const { entities, category } = useLibraryStore();
	const { isPlaying } = useAudioPlayerContext();
	const source = useAudiobar((state) => state.source);

	const checkIsPlaying = (_id: string) => isPlaying && source?._id === _id;

	return (
		<div className="flex flex-col my-0 py-2">
			{entities?.map((t) => {
				const { subtitle } = getLibraryEntityDescription({
					category,
					entity: t,
				});

				return (
					<Tooltip key={t._id}>
						<TooltipTrigger>
							<Link
								to={`/${t.entity_type}/$id`}
								params={{ id: t.entity._id }}
								className={cn([
									"grid rounded-[6px] aspect-[1] w-full p-2 cursor-pointer hover:bg-[#1F1F1F]",
								])}
							>
								<img
									src={`${t.entity.picture_url}?w=80&h=80`}
									alt={t.entity.name}
									className={cn([
										"w-full object-cover aspect-[1]",
										t.entity_type === "artist"
											? "rounded-full"
											: "rounded-[6px]",
									])}
								/>
							</Link>
						</TooltipTrigger>
						<TooltipContent
							side="right"
							align="center"
							className="flex items-center gap-4"
						>
							<div className="flex flex-col">
								<p>{t.entity.name}</p>
								<p className="inline-flex items-center gap-1.5 text-[#b0b0b0]">
									{t.pinned_at && <PinIcon className="text-primary" />}{" "}
									<span>{subtitle}</span>
								</p>
							</div>
							{checkIsPlaying(t.entity._id) && (
								<PlayingIcon className="text-primary" size={18} />
							)}
						</TooltipContent>
					</Tooltip>
				);
			})}
		</div>
	);
}
