import { BiSolidGrid as CompactGridIcon } from "react-icons/bi";
import { BsList as CompactListIcon } from "react-icons/bs";
import { FiGrid as DefaultGridIcon } from "react-icons/fi";
import { HiOutlineListBullet as DefaultListIcon } from "react-icons/hi2";
import type { IconType } from "react-icons/lib";
import type { TLibraryStore } from "@/features/library/store";

export const LIBRARY_SORT: Record<TLibraryStore["sort"], string> = {
	alphabetical: "Alphabetical",
	creator: "Creator",
	"recently-added": "Recently added",
	recents: "Recents",
} as const;

export const LIBRARY_VIEW: Record<
	TLibraryStore["view"],
	{ text: string; icon: IconType }
> = {
	"compact-list": {
		text: "Compact list",
		icon: CompactListIcon,
	},
	"default-list": {
		text: "Default list",
		icon: DefaultListIcon,
	},
	"compact-grid": {
		text: "Compact grid",
		icon: CompactGridIcon,
	},

	"default-grid": {
		text: "Default grid",
		icon: DefaultGridIcon,
	},
} as const;

export const LIBRARY_SIZES: Record<TLibraryStore["size"], string> = {
	DEFAULT: "420px",
	COLLAPSED: "74px",
	EXPANDED: "100%",
} as const;
