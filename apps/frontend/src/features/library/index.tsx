import { useEffect, useRef } from "react";
import { LIBRARY_SIZES } from "@/constants/library";
import { useLibrary } from "@/hooks/query/use-library";
import { cn } from "@/lib/utils";
import { LibraryCategories } from "./categories";
import { LibraryEntities } from "./entities";
import { LibraryFilterAndSort } from "./filter-and-sort";
import { LibraryHeader } from "./header";
import { LibraryEntitiesTableHeader } from "./header/entities-table-header";
import { LibrarySearchNothingFound } from "./nothing-found";
import { LibraryHeaderSearch } from "./search";
import { LibraryModuleSkeleton } from "./skeleton";
import { useLibraryStore } from "./store";

export function LibraryModule() {
	const { size, view, scrolled, init, entities, search } = useLibraryStore();
	const { data, isPending } = useLibrary();

	const containerRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (data) init(data);
	}, [data, init]);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.style.width = LIBRARY_SIZES[size];
			containerRef.current.style.minWidth = LIBRARY_SIZES[size];
		}
	}, [size]);

	useEffect(() => {
		if (wrapperRef.current) {
			wrapperRef.current.style.width = LIBRARY_SIZES[size];
			wrapperRef.current.style.minWidth = LIBRARY_SIZES[size];
			wrapperRef.current.style.transition =
				size === "EXPANDED" ? "all 0.2s ease" : "none";
			wrapperRef.current.style.zIndex = size === "EXPANDED" ? "25" : "auto";
		}
	}, [size]);

	return (
		<>
			<div
				className={cn(["[grid-area:library]", size !== "EXPANDED" && "hidden"])}
				style={{ width: LIBRARY_SIZES.DEFAULT }}
			/>
			<div
				ref={containerRef}
				className={cn([
					"h-full relative",
					size === "EXPANDED"
						? "col-[library/main] row-[library/main]"
						: "[grid-area:library]",
				])}
			>
				<div
					ref={wrapperRef}
					className="absolute top-0 left-0 h-full flex flex-col overflow-hidden bg-[#121212] rounded-[8px]"
				>
					<div
						className={cn([
							"flex flex-col gap-[18px] pt-4 px-4 z-1",
							scrolled && "shadow-md shadow-black/30",
						])}
					>
						<LibraryHeader />
						{size !== "COLLAPSED" && (
							<>
								<div className="flex items-center justify-between">
									<LibraryCategories />
									{size === "EXPANDED" && (
										<div className="flex items-center justify-between gap-4">
											<LibraryHeaderSearch />
											<LibraryFilterAndSort />
										</div>
									)}
								</div>
								{size === "DEFAULT" && (
									<div className="flex items-center justify-between">
										<LibraryHeaderSearch />
										<LibraryFilterAndSort />
									</div>
								)}
							</>
						)}
						{size === "EXPANDED" && view.includes("list") && (
							<LibraryEntitiesTableHeader />
						)}
					</div>

					{isPending && <LibraryModuleSkeleton />}
					{Boolean(entities.length) && <LibraryEntities />}
					{Boolean(!isPending && !entities.length && search) && (
						<LibrarySearchNothingFound />
					)}
				</div>
			</div>
		</>
	);
}
