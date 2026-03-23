import { Link } from "@tanstack/react-router";
import { IoShareOutline } from "react-icons/io5";
import { useNowPlaying } from "@/hooks/query/use-now-playing";
import { cn } from "@/lib/utils";
import { IconButton } from "@/ui/buttons/icon-button";
import { LikeButton } from "@/ui/buttons/like-button";
import { useSidebarStore } from "../store";

export const NowPlayingInfo = () => {
	const hovered = useSidebarStore((state) => state.hovered);
	const { data } = useNowPlaying();

	if (!data) return;

	return (
		<div className="flex flex-col gap-4">
			<img
				src={`${data?.album.picture_url}?w=772&h=772`}
				alt={data?.name}
				className="w-full h-full aspect-square rounded-[8px] border-none outline-none shadow-2xl shadow-black/30 select-none"
			/>
			<div className="flex items-center justify-between gap-2">
				<div>
					<Link to={`/album/$id`} params={{ id: data?.album._id }}>
						<p className="text-[24px] font-bold hover:underline line-clamp-1">
							{data?.name}
						</p>
					</Link>
					<Link to={`/artist/$id`} params={{ id: data?.author._id }}>
						<p className="text-[#ffffffb3] hover:underline line-clamp-1">
							{data?.author.name}
						</p>
					</Link>
				</div>
				<div className="flex items-center gap-2">
					<IconButton
						size="auto"
						tooltip="Copy link to Song"
						className={cn([
							"w-7 h-7 opacity-0 duration-400",
							hovered ? "translate-x-0 opacity-100" : "translate-x-4.5",
						])}
					>
						<IoShareOutline />
					</IconButton>
					<LikeButton _id={data._id} />
				</div>
			</div>
		</div>
	);
};
