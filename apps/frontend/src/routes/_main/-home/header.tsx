import { useMainStore } from "@/features/main/store";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/buttons/button";

export const HomePageHeader = () => {
	const scroll = useMainStore((state) => state.scroll);
	const accent = useMainStore((state) => state.accent);

	return (
		<div className="sticky z-5 top-0">
			<div
				className={cn([
					"absolute top-0 left-0 w-full h-full transition-all duration-400 opacity-0 after:transition-all after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/60",
				])}
				style={{
					backgroundColor: accent || "transparent",
					opacity: Math.min(scroll / 100, 1),
				}}
			/>
			<div className="container flex gap-2.5 px-10 py-5 text-sm relative z-6">
				<Button variant="white">All</Button>
				<Button
					disabled
					variant="transparent"
					tooltip="SHOWCASE: Not implemented yet."
				>
					Music
				</Button>
				<Button
					disabled
					variant="transparent"
					tooltip="SHOWCASE: Not implemented yet."
				>
					Podcasts
				</Button>
			</div>
		</div>
	);
};
