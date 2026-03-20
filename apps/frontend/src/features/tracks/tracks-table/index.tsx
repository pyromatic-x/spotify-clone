import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { MAIN_SCROLLABLE_CONTAINER } from "@/constants/dom-ids";
import { useMainStore } from "@/features/main/store";
import { useIsSticky } from "@/hooks/use-is-sticky";
import type { TEntityTypes } from "@/lib/api/schemas/common";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/buttons/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/ui/table";
import { type TTracksTableRow, tracksTableColumns } from "./columns";
import { HoveringFeature } from "./hovering-feature";

interface TProps {
	tracks: Array<TTracksTableRow>;
	entity: Exclude<TEntityTypes, "user">;
	header?: boolean;
	cut?: number;
}

export const TracksTable = ({
	tracks: _tracks,
	cut,
	header = true,
	entity,
}: TProps) => {
	const width = useMainStore((state) => state.width);

	const [isCut, setIsCut] = useState(true);

	const tracks = useMemo(() => {
		if (cut === undefined || !isCut) return _tracks;

		return _tracks.slice(0, cut);
	}, [_tracks, isCut, cut]);

	const table = useReactTable({
		data: tracks,
		columns: tracksTableColumns,
		getCoreRowModel: getCoreRowModel(),
		_features: [HoveringFeature],
		state: {
			columnVisibility: {
				_id: false,
				entity: false,
				entity_id: false,
				times_listened: entity === "artist",
				album: width > 770 && entity === "playlist",
				date: width > 900 && entity === "playlist",
			},
		},
	});

	const { ref, isSticky } = useIsSticky({
		root: document.getElementById(MAIN_SCROLLABLE_CONTAINER),
		rootMargin: "-65px 0px 0px 0px",
		threshold: 1,
	});

	return (
		<>
			<Table>
				{header && (
					<TableHeader
						ref={ref}
						className={cn([
							"border-b border-white/10 sticky top-16 z-3",
							isSticky &&
								"before:absolute before:top-0 before:-left-6 before:w-[calc(100%+48px)] before:-z-1 before:bg-[#1f1f1f] before:h-[40.5px] before:border-b before:border-white/10",
						])}
					>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className="first:text-center first:pl-4 nth-last-[2]:w-max text-[#b3b3b3] font-normal"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
				)}
				<TableBody className="pt-2">
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className="group"
								onMouseEnter={() => row.setIsHovered(true)}
								onMouseLeave={() => row.setIsHovered(false)}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className="line-clamp-1 table-cell last:w-0 last:pr-4 first:w-12 first:min-w-10 first:pl-4 first:text-center nth-last-[2]:text-end nth-last-[2]:w-px nth-last-[3]:text-right"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={tracksTableColumns.length}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{cut !== undefined && (
				<Button
					variant="link"
					onClick={() => setIsCut((state) => !state)}
					className="mt-3"
				>
					{isCut ? "See more" : "See less"}
				</Button>
			)}
		</>
	);
};
