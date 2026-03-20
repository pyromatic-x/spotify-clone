/** biome-ignore-all lint/a11y/noStaticElementInteractions: skip */

import { BsChevronLeft as Chevron } from "react-icons/bs";
import { SIDEBAR_SIZES } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { SidebarDevices } from "./devices";
import { SidebarNowPlaying } from "./now-playing";
import { NowPlayingFullscreen } from "./now-playing/fullscreen";
import { SidebarQueue } from "./queue";
import { useSidebarStore } from "./store";

export const SidebarModule = () => {
	const layers = useSidebarStore((state) => state.layers);
	const state = useSidebarStore((state) => state.state);
	const toggle = useSidebarStore((state) => state.toggle);
	const onHover = useSidebarStore((state) => state.onHover);
	// const onScroll = useSidebarStore((state) => state.onScroll);

	return (
		<div
			className="relative duration-500 transition-all ease-in-out [grid-area:sidebar] min-h-0 rounded-md bg-[#121212]"
			style={{ width: `${SIDEBAR_SIZES[state]}px` }}
			onMouseEnter={() => onHover(true)}
			onMouseLeave={() => onHover(false)}
		>
			<button
				type="button"
				className={cn([
					"absolute top-0 right-0 w-full h-full flex items-center justify-center transparent cursor-pointer z-10 duration-500 transition-all ease-in-out",
					state === "OPENED" &&
						"opacity-0 pointer-events-none translate-x-[110%]",
				])}
				onClick={() => toggle(0, "now-playing")}
			>
				<Chevron size={22} />
			</button>
			{(layers[0] === "now-playing" ||
				state === "CLOSED" ||
				state === "PREVIEW") && <SidebarNowPlaying />}
			<div
				className={cn([
					"w-full h-full absolute top-0 left-0 overflow-hidden z-20 rounded-md",
					!layers[1] && "pointer-events-none",
				])}
			>
				<SidebarDevices />
				<SidebarQueue />
			</div>
			<NowPlayingFullscreen />
		</div>
	);
};
