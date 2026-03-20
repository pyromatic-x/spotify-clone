import { createArrayWithRandoms } from "@/lib/array";
import { Skeleton } from "@/ui/skeleton";

export const LibraryModuleSkeleton = () => (
	<div className="flex flex-col pt-2">
		{createArrayWithRandoms(20).map((t) => (
			<div className="flex h-16 gap-2 p-2" key={t}>
				<div className="w-12 min-w-12 h-12 rounded-[6px]" />
				<div className="flex flex-col w-full justify-around">
					<Skeleton className="w-[55%] h-4" />
					<Skeleton className="w-[40%] h-4" />
				</div>
			</div>
		))}
	</div>
);
