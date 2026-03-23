import { useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { useLibraryStore } from "../../store";
import { LibraryEntitiesCompactGridItem } from "./compact-item";
import { LibraryEntitiesDefaultGridItem } from "./default-item";

export function LibraryEntitiesGrid() {
	const { entities, size, view } = useLibraryStore();

	const ref = useRef<HTMLDivElement>(null);
	const { width } = useResizeObserver({
		ref,
		box: "border-box",
	});

	const Item =
		view === "compact-grid"
			? LibraryEntitiesCompactGridItem
			: LibraryEntitiesDefaultGridItem;

	return (
		<div
			ref={ref}
			className={cn(["grid py-2"])}
			style={{
				gridTemplateColumns: `repeat(${size === "EXPANDED" ? Math.round((width as number) / 160) : 3}, minmax(0, 1fr))`,
			}}
		>
			{entities?.map((entity) => (
				<Item key={entity._id} entity={entity} />
			))}
		</div>
	);
}
