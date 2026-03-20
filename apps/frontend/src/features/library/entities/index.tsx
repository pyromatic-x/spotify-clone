import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useLibraryStore } from "../store";
import { LibraryEntitiesCollapsed } from "./collapsed";
import { LibraryEntitiesGrid } from "./grid";
import { LibraryEntitiesList } from "./list";

export const LibraryEntities = () => {
	const { view, size, update } = useLibraryStore();

	const handleOnScroll = (event: Event) => {
		update({
			payload: { scrolled: (event.target as HTMLElement).scrollTop > 0 },
		});
	};

	return (
		<OverlayScrollbarsComponent
			defer
			options={{
				scrollbars: {
					autoHide: "leave",
					autoHideDelay: 450,
				},
			}}
			events={{
				scroll: (_, e) => handleOnScroll(e),
			}}
			className="px-1 pt-2"
		>
			{size === "COLLAPSED" && <LibraryEntitiesCollapsed />}
			{size !== "COLLAPSED" && view.includes("grid") && <LibraryEntitiesGrid />}
			{size !== "COLLAPSED" && view.includes("list") && <LibraryEntitiesList />}
		</OverlayScrollbarsComponent>
	);
};
