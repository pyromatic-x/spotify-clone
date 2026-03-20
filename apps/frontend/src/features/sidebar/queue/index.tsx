import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { SIDEBAR_SIZES } from "@/constants/sidebar";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import { Tracks } from "@/features/tracks/standalone";
import { cn } from "@/lib/utils";
import { Scrollable } from "@/ui/scrollable";
import { useSidebarStore } from "../store";
import { SidebarQueueHeader } from "./header";

export const SidebarQueue = () => {
	const layers = useSidebarStore((store) => store.layers);
	const onScroll = useSidebarStore((store) => store.onScroll);
	const current = useAudiobar((store) => store.track);
	const allTracks = useAudiobar((store) => store.tracks);
	const source = useAudiobar((store) => store.source);

	const open = layers[1] === "queue";

	const tracks = useMemo(() => {
		const idx = allTracks.findIndex((t) => t._id === current?._id);

		if (idx !== -1) return allTracks.slice(idx + 1);
		return allTracks;
	}, [allTracks, current?._id]);

	return (
		<div
			className={cn(
				"overflow-hidden w-full h-full absolute top-0 left-0",
				!layers[1] && "transition-all duration-300",
				!open && "translate-y-[200px] opacity-0 pointer-events-none",
			)}
			style={{ minWidth: `${SIDEBAR_SIZES.OPENED}px` }}
		>
			<SidebarQueueHeader />

			<Scrollable
				className="bg-[#121212] w-full h-full translate-y-0 p-4 flex flex-col gap-4 pb-20"
				onScroll={onScroll}
			>
				{current && (
					<div className="mb-6">
						<h2 className="font-bold">Now playing</h2>
						<Tracks tracks={[current]} />
					</div>
				)}

				{Boolean(tracks.length) && (
					<div>
						{source && (
							<h2 className="font-bold">
								Next from:{" "}
								<Link to={`/${source.entity}/$id`} params={{ id: source._id }}>
									{source.name}
								</Link>
							</h2>
						)}
						<Tracks tracks={tracks} />
					</div>
				)}
			</Scrollable>
		</div>
	);
};
