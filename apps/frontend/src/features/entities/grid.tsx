import { type ComponentProps, useLayoutEffect, useState } from "react";
import type { TEntityCard } from "@/lib/api/schemas/common";
import { createArrayWithRandoms } from "@/lib/array";
import { cn } from "@/lib/utils";
import { useMainStore } from "../main/store";
import { EntityCard } from "./cards/entity-card";
import { EntityCardSkeleton } from "./cards/entity-card-skeleton";

type TProps = {
	entities: Array<TEntityCard> | number;
	className?: ComponentProps<"div">["className"];
};

export const EntitiesGrid = ({ entities, className }: TProps) => {
	const width = useMainStore((s) => s.width);

	const [cols, setCols] = useState(getCols(width));

	useLayoutEffect(() => setCols(getCols(width)), [width]);

	if (typeof entities === "number")
		return (
			<div className={cn(["grid -mx-3", cols, className])}>
				{createArrayWithRandoms(entities).map((t) => (
					<EntityCardSkeleton key={t} />
				))}
			</div>
		);

	return (
		<div className={cn(["grid -mx-3", cols, className])}>
			{entities.map((t) => (
				<EntityCard key={t._id} {...t} responsive />
			))}
		</div>
	);
};

const getCols = (width: number): string => {
	if (width > 1820) return "grid-cols-10";
	else if (width > 1780) return "grid-cols-9";
	else if (width > 1600) return "grid-cols-8";
	else if (width > 1280) return "grid-cols-7";
	else if (width > 1240) return "grid-cols-6";
	else if (width > 1050) return "grid-cols-5";
	else if (width > 870) return "grid-cols-4";
	else if (width > 600) return "grid-cols-3";

	return "grid-cols-2";
};
