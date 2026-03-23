import type { OnChangeFn } from "@tanstack/react-table";
import {
	functionalUpdate,
	makeStateUpdater,
	type Row,
	type RowData,
	type Table,
	type TableFeature,
	type TableOptionsResolved,
	type TableState,
	type Updater,
} from "@tanstack/table-core";

declare module "@tanstack/table-core" {
	// biome-ignore lint/correctness/noUnusedVariables: skip
	interface Row<TData extends RowData> extends HoveringRowAPI {}
}

interface HoveringOptions {
	onRowHoveringChange?: OnChangeFn<RowHoveringState | undefined>;
}

type RowHoveringState = Record<string, boolean>;

interface HoveringTableState {
	rowHovering?: RowHoveringState;
}

interface HoveringTableAPI<TData> {
	getHoveredRows(): Row<TData>[];
	setHoveredRows(updater: Updater<RowHoveringState | undefined>): void;
}

interface HoveringRowAPI {
	getIsHovered(): boolean;
	setIsHovered(state: boolean): void;
}

export const HoveringFeature = {
	createRow<TData extends RowData>(row: Row<TData>, table: Table<TData>): void {
		type RowWithHover = Row<TData> & HoveringRowAPI;

		(row as RowWithHover).getIsHovered = () =>
			Boolean((table.getState() as HoveringTableState).rowHovering?.[row.id]);

		(row as RowWithHover).setIsHovered = (state) =>
			table.setState((old: TableState & HoveringTableState) => ({
				...old,
				rowHovering: {
					...old.rowHovering,
					[row.id]: state,
				},
			}));
	},

	createTable<TData extends RowData>(table: Table<TData>): void {
		type TableWithHover = Table<TData> & HoveringTableAPI<TData>;

		(table as TableWithHover).getHoveredRows = () =>
			Object.entries((table.getState() as HoveringTableState).rowHovering || {})
				.filter(([, isHovered]) => isHovered)
				.map(([id]) => table.getRow(id));

		(table as TableWithHover).setHoveredRows = (updater) => {
			const safeUpdater: Updater<RowHoveringState | undefined> = (old) =>
				functionalUpdate(updater, old);

			return (table.options as HoveringOptions).onRowHoveringChange?.(
				safeUpdater,
			);
		};
	},

	getDefaultOptions<TData extends RowData>(
		table: Table<TData>,
	): Partial<TableOptionsResolved<TData>> & HoveringOptions {
		return {
			// biome-ignore lint/suspicious/noExplicitAny: skip
			onRowHoveringChange: makeStateUpdater("hovering" as any, table),
		};
	},

	getInitialState(state): Partial<TableState> & HoveringTableState {
		return {
			rowHovering: {},
			...(state as Partial<TableState>),
		};
	},
} satisfies TableFeature;
