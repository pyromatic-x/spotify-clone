import { cn } from "@/lib/utils";
import { useLibraryStore } from "../store";
import { LibraryHeaderCollapseButton } from "./collapse-button";
import { LibraryHeaderCreateButton } from "./create-button";
import { LibraryHeaderExpandButton } from "./expand-button";

export const LibraryHeader = () => {
	const { size } = useLibraryStore();

	return (
		<div
			className={cn([
				"flex items-center justify-between",
				size === "COLLAPSED" ? "flex-col gap-3.5 pb-3.5" : "flex-row",
			])}
		>
			<LibraryHeaderCollapseButton />
			{size === "COLLAPSED" && <LibraryHeaderCreateButton variant="icon" />}
			{size !== "COLLAPSED" && (
				<div className="flex gap-2 items-center">
					<LibraryHeaderCreateButton variant="full" />
					<LibraryHeaderExpandButton />
				</div>
			)}
		</div>
	);
};
