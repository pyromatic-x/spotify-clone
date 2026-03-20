import { useMemo } from "react";
import { MdVerified } from "react-icons/md";
import tinycolor from "tinycolor2";
import { useMainStore } from "@/features/main/store";
import type { TArtistPage } from "@/lib/api/schemas/artist";
import { toNumberWithDigits } from "@/lib/number";
import { calcPageHeadingSize } from "./utils";

export const ArtistPageHero = ({ artist }: { artist: TArtistPage }) => {
	const { accent, backdrop_url, name, verified, listeners } = artist;

	const width = useMainStore((s) => s.width);

	const gradient = tinycolor(accent || "#121212")
		.darken(13)
		.toHexString();

	const headingSize = useMemo(
		() => calcPageHeadingSize({ text: name, width }),
		[width, name],
	);

	const { scale, opacity } = useTransition();

	return (
		<div className="relative h-[40vh]" style={{ backgroundColor: accent }}>
			<div className="absolute h-full w-full z-1 overflow-hidden">
				<div
					className="absolute h-full w-full z-1 bg-cover bg-center"
					style={{ backgroundImage: `url(${backdrop_url})`, scale, opacity }}
				/>
			</div>
			<div
				className="absolute bottom-0 h-[60%] w-full z-2 bg-cover"
				style={{
					backgroundImage: `linear-gradient(in oklch to top, #000000BF, transparent), none`,
				}}
			/>

			<div
				className="absolute bottom-[-180px] h-[180px] w-full -z-1"
				style={{
					backgroundImage: `linear-gradient(in oklch to bottom, ${gradient}, transparent), none`,
				}}
			/>

			<div className="w-full h-full flex flex-col items-start justify-end gap-6 container relative z-3 p-6">
				{verified && (
					<p className="inline-flex gap-1.5 items-center">
						<MdVerified className="text-[#4cb3ff]" size={24} />
						<span>Verified Artist</span>
					</p>
				)}
				<h1
					className="text-white font-bold leading-18"
					style={{ fontSize: headingSize }}
				>
					{name}
				</h1>
				<p>{toNumberWithDigits(listeners.monthly)} monthly listeners</p>
			</div>
		</div>
	);
};

const useTransition = () => {
	const scroll = useMainStore((store) => store.scroll);

	const scale = useMemo(() => {
		const maxScroll = 180;

		const min = 1.05;
		const max = 1.1;

		const clamped = Math.max(0, Math.min(scroll, maxScroll));

		return max - (max - min) * (clamped / maxScroll);
	}, [scroll]);

	const opacity = useMemo(() => {
		const maxScroll = 220;

		const min = 0;
		const max = 1;

		const clamped = Math.max(0, Math.min(scroll, maxScroll));

		return max - (max - min) * (clamped / maxScroll);
	}, [scroll]);

	return { scale, opacity };
};
