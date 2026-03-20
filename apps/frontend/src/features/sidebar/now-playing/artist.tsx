import { Link } from "@tanstack/react-router";
import { useNowPlaying } from "@/hooks/query/use-now-playing";
import { toNumberWithDigits } from "@/lib/number";
import { FollowButton } from "@/ui/buttons/follow-button";

export const NowPlayingArtist = () => {
	const { data } = useNowPlaying();

	if (!data) return;

	return (
		<div className="rounded-[8px] overflow-hidden bg-[#1f1f1f] relative">
			<Link
				to={"/artist/$id"}
				params={{ id: data.author._id }}
				type="button"
				className="absolute top-0 left-0 w-full h-full"
			/>
			<div
				className="h-[250px] p-4"
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%), url("${data.author.about.picture_url}?h=520")`,
					backgroundPosition: "50% 50%",
					backgroundSize: "cover",
				}}
			>
				<h2 className="font-bold">About the artist</h2>
			</div>
			<div className="p-4 text-white/70">
				<Link
					to={"/artist/$id"}
					params={{ id: data.author._id }}
					className="hover:underline text-white font-bold"
				>
					{data.author.name}
				</Link>
				<div className="flex justify-between items-center gap-2">
					<p>
						{toNumberWithDigits(data.author.listeners.monthly)} monthly
						followers
					</p>
					<FollowButton _id={data.author._id} entity="artist">
						Follow
					</FollowButton>
				</div>
				<p className="text-sm line-clamp-3">{data.author.about.text}</p>
			</div>
		</div>
	);
};
