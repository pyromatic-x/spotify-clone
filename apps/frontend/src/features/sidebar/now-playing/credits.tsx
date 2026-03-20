import { Link } from "@tanstack/react-router";
import { useNowPlaying } from "@/hooks/query/use-now-playing";
import { Button } from "@/ui/buttons/button";
import { FollowButton } from "@/ui/buttons/follow-button";

export const NowPlayingCredits = () => {
	const { data } = useNowPlaying();

	if (!data) return;

	return (
		<div className="rounded-[8px] overflow-hidden bg-[#1f1f1f] relative p-4">
			<div className="flex items-center justify-between mb-4">
				<p className="font-bold">Credits</p>
				<Button variant="link">Show all</Button>
			</div>
			<div className="flex flex-col gap-3">
				{data.credits.map((t) => (
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
	);
};
