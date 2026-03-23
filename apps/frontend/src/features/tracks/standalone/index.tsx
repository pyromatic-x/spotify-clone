import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import type { TTrack } from "@/lib/api/schemas/track";
import { cn } from "@/lib/utils";
import { IconButton } from "@/ui/buttons/icon-button";
import { PlayButton } from "@/ui/buttons/play-button";

interface TProps {
	tracks: Array<TTrack>;
}

export const Tracks = ({ tracks }: TProps) => {
	return (
		<div className="flex flex-col">
			{tracks.map((t) => (
				<Track key={t._id} {...t} />
			))}
		</div>
	);
};

const Track = ({ _id, name, album, author }: TTrack) => {
	const ref = useRef<HTMLDivElement>(null);

	const track = useAudiobar((store) => store.track);
	const source = useAudiobar((store) => store.source);

	return (
		<div
			ref={ref}
			className="flex p-2 gap-2 items-center justify-between h-16 cursor-pointer w-[calc(100%+16px)] relative -left-2 hover:bg-white/10 rounded-[6px] group"
		>
			<div className="flex gap-2 h-full w-full">
				<div className="relative w-auto h-full aspect-square">
					<img
						src={`${album.picture_url}?w=128&h=128`}
						alt={name}
						className="w-auto h-full aspect-square rounded-[4px]"
					/>
					{source && (
						<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 rounded-[4px]">
							<PlayButton
								track_id={_id}
								entity={source?.entity}
								entity_id={source?._id}
								variant="secondary"
								className="p-0 w-max [&_svg]:w-5.5 [&_svg]:h-5.5"
							/>
						</div>
					)}
				</div>
				<div>
					<p
						className={cn([
							"line-clamp-1",
							track?._id === _id && "text-primary",
						])}
					>
						{name}
					</p>
					<Link
						to="/artist/$id"
						params={{ id: author._id }}
						className="text-[#b3b3b3] group-hover:text-white hover:underline text-sm"
					>
						{author.name}
					</Link>
				</div>
			</div>
			<IconButton
				tooltip="SHOWCASE: not implemented yet"
				className="group-hover:opacity-100 opacity-0 transition-none size-4.5"
				size="auto"
			>
				<BsThreeDots />
			</IconButton>
		</div>
	);
};
