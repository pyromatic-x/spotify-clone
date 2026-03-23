import { type RefObject, useMemo, useRef } from "react";
import { LuLibrary as LibraryIcon } from "react-icons/lu";
import {
	TbLayoutSidebarLeftCollapse as CollapseIcon,
	TbLayoutSidebarRightCollapse as ExpandIcon,
} from "react-icons/tb";
import { useHover } from "usehooks-ts";
import { useUser } from "@/hooks/query/use-user";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { useLibraryStore } from "../store";

export const LibraryHeaderCollapseButton = () => {
	const { size, update, ...library } = useLibraryStore();
	const { data: user } = useUser();

	const onClick = () => {
		if (size === "EXPANDED") return;

		update({
			payload: {
				...library,
				size: size === "DEFAULT" ? "COLLAPSED" : "DEFAULT",
				search: "",
			},
			user: user!,
		});
	};

	const tooltip = useMemo(() => {
		if (size === "DEFAULT") return "Collapse Your Library";
		if (size === "COLLAPSED") return "Open Your Library";
		return "";
	}, [size]);

	if (size === "EXPANDED") return <p className="font-bold">Your Library</p>;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					onClick={onClick}
					className={cn([
						"flex gap-2 items-center cursor-pointer",
						size === "COLLAPSED" ? "justify-center w-full" : "w-max",
					])}
				>
					{size === "COLLAPSED" && <CollapsedButton />}
					{size === "DEFAULT" && <CollapseIcon size="22px" />}
					{size !== "COLLAPSED" && <p className="font-bold">Your Library</p>}
				</button>
			</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	);
};

const CollapsedButton = () => {
	const ref = useRef<HTMLDivElement>(null);
	const isHover = useHover(ref as RefObject<HTMLElement>);

	return (
		<div className="relative h-[26px] w-[26px]" ref={ref}>
			<LibraryIcon
				size="26px"
				opacity={isHover ? 0 : 1}
				className="absolute left-0 transition-opacity duration-200"
			/>
			<ExpandIcon size="26px" className="expand" opacity={isHover ? 1 : 0} />
		</div>
	);
};
