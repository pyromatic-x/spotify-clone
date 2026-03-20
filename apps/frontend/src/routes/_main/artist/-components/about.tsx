import { useArtistPage } from "@/hooks/query/use-artist-page";
import { toNumberWithDigits } from "@/lib/number";

export const ArtistPageAbout = () => {
	const { data: artist } = useArtistPage();

	if (!artist) return;

	return (
		<div className="">
			<h2 className="text-[24px] font-bold text-white mb-4">About</h2>
			<div
				className="max-w-[950px] h-[500px] rounded-[8px] overflow-hidden relative bg-[#282828] bg-cover bg-center p-10 flex flex-col justify-end text-white cursor-pointer hover:scale-[1.01] transition-transform"
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%), url(${artist.about.picture_url}?h=1000)`,
				}}
			>
				<div className="[@container_(min-width:800px)]:max-w-[70%] [@container_(max-width:800px)]:max-w-auto">
					<p className="font-bold">
						{toNumberWithDigits(artist.listeners.monthly)} monthly listeners
					</p>
					<p className="line-clamp-3">{artist.about.text}</p>
				</div>
			</div>
		</div>
	);
};
