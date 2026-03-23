import { Link } from "@tanstack/react-router";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import { useNowPlaying } from "@/hooks/query/use-now-playing";
import { toNumberWithDigits } from "@/lib/number";
import { Button } from "@/ui/buttons/button";
import { FollowButton } from "@/ui/buttons/follow-button";

export const NowPlayingFullscreenInfo = () => {
	const track = useAudiobar((state) => state.track);
	const { data: nowPlaying } = useNowPlaying();

	return (
		<div className="max-w-[1150px] grid grid-cols-2 gap-4 px-4 mx-auto relative z-1">
			<div className="relative aspect-square w-full h-auto bg-[#1f1f1f] rounded-2xl overflow-hidden p-6">
				<div
					className="absolute top-0 left-0 w-full h-full brightness-40"
					style={{
						backgroundImage: `url(${track?.album.picture_url})`,
						backgroundSize: "100%",
						backgroundRepeat: "no-repeat",
					}}
				/>
				<div className="flex flex-col justify-between relative z-1 h-full w-full pb-2">
					<h2 className="font-bold text-[24px]">About the artist</h2>
					<div>
						<div className="flex justify-between items-center gap-2 py-3">
							<p>
								{toNumberWithDigits(nowPlaying?.author.listeners.monthly || 0)}{" "}
								monthly followers
							</p>
							<FollowButton
								_id={nowPlaying?.author._id as string}
								entity="artist"
							>
								Follow
							</FollowButton>
						</div>
						<p className="text-sm line-clamp-3">
							{nowPlaying?.author.about.text}
						</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="p-6 bg-[#1f1f1f] rounded-2xl">
					<div className="flex items-center justify-between mb-4">
						<p className="font-bold">Credits</p>
						<Button variant="link">Show all</Button>
					</div>
					<div className="flex flex-col gap-3">
						{nowPlaying?.credits.map((t) => (
							<div
								key={t._id + t.role}
								className="flex items-center justify-between gap-2"
							>
								<div>
									<span className="text-white hover:underline">
										{t._id ? (
											<Link to="/artist/$id" params={{ id: t._id }}>
												{t.name}
											</Link>
										) : (
											<p>{t.name}</p>
										)}
									</span>
									<p className="text-white/70 text-sm">{t.role}</p>
								</div>
								{t._id && <FollowButton _id={t._id} entity="artist" />}
							</div>
						))}
					</div>
				</div>
				<div className="p-6 bg-[#1f1f1f] rounded-2xl">TODO</div>
			</div>
		</div>
	);
};
