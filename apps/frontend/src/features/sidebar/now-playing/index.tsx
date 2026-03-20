/** biome-ignore-all lint/a11y/noStaticElementInteractions: skip */

import { SIDEBAR_SIZES } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { Scrollable } from "@/ui/scrollable";
import { useSidebarStore } from "../store";
import { NowPlayingArtist } from "./artist";
import { NowPlayingCredits } from "./credits";
import { NowPlayingHeader } from "./header";
import { NowPlayingInfo } from "./info";
import { NowPlayingNextInQueue } from "./next-in-queue";

export const SidebarNowPlaying = () => {
	const state = useSidebarStore((state) => state.state);
	const onScroll = useSidebarStore((state) => state.onScroll);

	return (
		<div
			className={cn([
				"bg-[#121212] h-full rounded-md z-10",
				"transition-all duration-500 ease-in-out translate-x-0",
			])}
			style={{ width: `${SIDEBAR_SIZES.OPENED}px` }}
		>
			<div
				className={cn([
					"h-full transition-all duration-500 ease-in-out",
					state === "PREVIEW" && "*:pointer-events-none opacity-5",
					state === "CLOSED" && "opacity-0",
					state === "OPENED" && "opacity-100",
				])}
			>
				<NowPlayingHeader />
				<Scrollable className="px-4 h-[calc(100%-64px)]" onScroll={onScroll}>
					<div className="flex flex-col gap-4 pb-4">
						<NowPlayingInfo />
						<NowPlayingArtist />
						<NowPlayingCredits />
						<NowPlayingNextInQueue />
					</div>
				</Scrollable>
			</div>
		</div>
	);
};
