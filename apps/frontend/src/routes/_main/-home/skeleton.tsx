import { EntitiesGrid } from "@/features/entities/grid";
import { useMainStore } from "@/features/main/store";
import { createArrayWithRandoms } from "@/lib/array";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/ui/skeleton";

export const HomePageSkeleton = () => {
	const width = useMainStore((s) => s.width);

	return (
		<div className="container relative z-1 px-10 pt-4">
			<Skeleton className="w-full max-w-[300px] h-7 rounded-full mb-4" />

			<div
				className={cn(
					["grid gap-3 mb-12"],
					width > 780 ? "grid-cols-4" : "grid-cols-2",
				)}
			>
				{createArrayWithRandoms(8).map((t) => (
					<div
						key={t}
						className="w-full h-10 flex items-center bg-[#333333] rounded-[4px] overflow-hidden"
					>
						<Skeleton className="aspect-square w-auto shrink-0 h-full bg-[#5d5d5d] shadow-xl shadow-black rounded-none" />
						<Skeleton className="w-full h-4 rounded-full mx-3" />
					</div>
				))}
			</div>
			<EntitiesGrid entities={40} className="gap-2" />
		</div>
	);
};
