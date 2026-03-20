import { Link } from "@tanstack/react-router";
import { useArtistPage } from "@/hooks/query/use-artist-page";

export const ArtistPagePick = () => {
	const { data: artist } = useArtistPage();

	if (!artist) return;

	return (
		<div className="[@container_(max-width:1200px)]:p-6">
			<h2 className="text-[24px] font-bold text-white pl-6 mb-4">
				Artist pick
			</h2>
			<Link
				to="/album/$id"
				params={{ id: artist.pick._id }}
				className="h-[250px] w-[340px] block overflow-hidden rounded-[8px] relative"
			>
				<img
					src={`${artist.pick.picture_url}?w=340`}
					alt=""
					className="w-full object-cover"
				/>
				<div className="absolute top-0 left-0 w-full h-full z-0 bg-[linear-gradient(hsla(0,0%,7%,0),#121212)]" />
				<div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-between">
					<div className="rounded-full bg-white flex items-center gap-3 p-0.5 w-max pr-3">
						<img
							src={`${artist.picture_url}?w=48&h=48`}
							alt=""
							className="w-6 h-6 rounded-full object-cover aspect-square"
						/>
						<p className="text-sm line-clamp-1 text-black">
							Posted by {artist.name}
						</p>
					</div>
					<div className="flex gap-4 items-center">
						<img
							src={`${artist.pick.picture_url}?w=152&h=152`}
							alt=""
							className="w-[76px] h-[76px] rounded-[4px] object-cover"
						/>
						<div>
							<p className="font-bold">{artist.pick.name}</p>
							<p className="text-sm text-[#b3b3b3]">Album</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
