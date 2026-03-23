import { Link } from "@tanstack/react-router";
import { LikeButton } from "@/ui/buttons/like-button";
import { useAudiobar } from "./audiobar-store";

const IMAGE_SIZE = 62;

export function AudiobarTrack() {
	const track = useAudiobar((state) => state.track);

	const src = `${track?.album.picture_url}?w=${IMAGE_SIZE * 2}&h=${IMAGE_SIZE * 2}`;

	return (
		<div className="flex items-center gap-4 min-w-[180px] w-[30%]">
			{track && (
				<>
					<img
						width={IMAGE_SIZE}
						height={IMAGE_SIZE}
						src={src}
						alt=""
						className="w-[62px] h-[62px] min-w-[62px] min-h-[62px] relative bg-black rounded-sm"
					/>
					<div className="flex flex-col mr-2">
						<Link
							className="text-sm cursor-pointer hover:underline line-clamp-1"
							to="/album/$id"
							params={{ id: track?.album._id }}
						>
							{track?.name}
						</Link>
						<Link
							to="/artist/$id"
							params={{ id: track?.author._id }}
							className="text-xs text-white/60 cursor-pointer hover:underline"
						>
							{track?.author.name}
						</Link>
					</div>
					<LikeButton
						_id={track._id}
						size="sm"
						defaultValue={track?.in_library}
					/>
				</>
			)}
		</div>
	);
}
