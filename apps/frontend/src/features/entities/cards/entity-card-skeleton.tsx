import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/ui/skeleton";

export const EntityCardSkeleton = ({
	className,
	...rest
}: ComponentProps<"div">) => {
	return (
		<div
			className={cn([
				"rounded-[4px] w-full h-auto p-3 bg-[#181818] flex flex-col gap-2",
				className,
			])}
			{...rest}
		>
			<Skeleton className="aspect-square w-full h-auto shadow-xl shadow-black/30 bg-[#333333]" />
			<Skeleton className="w-full h-5 rounded-full" />
			<Skeleton className="w-[50%] h-5 rounded-full" />
		</div>
	);
};
