import { Link } from "@tanstack/react-router";
import { AiOutlineExpandAlt as FullScreenIcon } from "react-icons/ai";
import { HiDotsHorizontal as MenuIcon } from "react-icons/hi";
import { TbLayoutSidebarLeftExpand as HideIcon } from "react-icons/tb";
import { useNowPlaying } from "@/hooks/query/use-now-playing";
import { cn } from "@/lib/utils";
import { IconButton } from "@/ui/buttons/icon-button";
import { useSidebarStore } from "../store";

export const NowPlayingHeader = () => {
	const state = useSidebarStore((state) => state.state);
	const toggle = useSidebarStore((state) => state.toggle);
	const hovered = useSidebarStore((state) => state.hovered);
	const scroll = useSidebarStore((state) => state.scroll);

	const { data } = useNowPlaying();

	return (
		<div
			className={cn(
				"h-16 w-full flex items-center relative overflow-hidden",
				scroll > 0 && "shadow-md shadow-black/30",
			)}
		>
			<div className="px-4 flex w-full items-center justify-between">
				<div
					className={cn([
						"flex items-center h-6 transition-transform gap-1.5",
						hovered && state === "OPENED"
							? "translate-x-0"
							: "-translate-x-7.5",
					])}
				>
					<IconButton
						size="auto"
						tooltip="Hide Now Playing view"
						onClick={() => toggle(0, "now-playing")}
						className={cn([
							"transition-all duration-400",
							hovered && state === "OPENED" ? "opacity-100" : "opacity-0",
						])}
					>
						<HideIcon />
					</IconButton>
					<Link to="/">
						<h1 className="font-bold hover:underline">{data?.name}</h1>
					</Link>
				</div>
				<div
					className={cn([
						"flex gap-2 opacity-0 transition-all duration-400",
						hovered && state === "OPENED" && "opacity-100",
					])}
				>
					<IconButton
						variant="circle-on-hover"
						tooltip={`More options for ${data?.name}`}
					>
						<MenuIcon />
					</IconButton>
					<IconButton
						variant="circle-on-hover"
						tooltip="Expand Now Playing view"
						onClick={() => toggle(2, "now-playing-fullscreen")}
					>
						<FullScreenIcon />
					</IconButton>
				</div>
			</div>
		</div>
	);
};
