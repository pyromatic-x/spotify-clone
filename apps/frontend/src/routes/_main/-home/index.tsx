import { FooterModule } from "@/features/footer";
import { useMainStore } from "@/features/main/store";
import { usePersonal } from "@/hooks/query/use-personal";
import { HomePageContent } from "./content";
import { HomePageHeader } from "./header";
import { HomePageSkeleton } from "./skeleton";

export const HomePage = () => {
	const { isPending } = usePersonal();
	const accent = useMainStore((s) => s.accent);

	return (
		<div className="relative w-full">
			<div
				className="absolute top-0 left-0 w-full h-64 transition-all duration-1000"
				style={{
					backgroundColor: accent || "#7860e8",
					backgroundImage:
						"linear-gradient(rgba(0,0,0,.6) 0, #121212 100%), var(--background-noise)",
				}}
			/>

			{isPending ? (
				<HomePageSkeleton />
			) : (
				<>
					<HomePageHeader />
					<HomePageContent />
					<FooterModule />
				</>
			)}
		</div>
	);
};
