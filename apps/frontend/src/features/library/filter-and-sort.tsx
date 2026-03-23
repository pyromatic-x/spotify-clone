import { IoMdCheckmark as CheckmarkIcon } from "react-icons/io";
import { LIBRARY_SORT, LIBRARY_VIEW } from "@/constants/library";
import { useUser } from "@/hooks/query/use-user";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/buttons/button";
import { ToggleGroup, ToggleGroupItem } from "@/ui/form/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { type TLibraryStore, useLibraryStore } from "./store";

export const LibraryFilterAndSort = () => {
	const { view, sort, update } = useLibraryStore();
	const { data: user } = useUser();

	const { icon: Icon } = LIBRARY_VIEW[view];

	const handleOnChangeView = (value: TLibraryStore["view"]) => {
		if (!value) return;
		update({ payload: { view: value }, user: user! });
	};

	const handleOnChangeSort = (value: TLibraryStore["sort"]) => {
		if (!value) return;
		update({ payload: { sort: value }, user: user! });
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="py-1">
					{LIBRARY_SORT[sort]} <Icon size="18px" />
				</Button>
			</PopoverTrigger>

			<PopoverContent
				side="bottom"
				sideOffset={4}
				align="end"
				alignOffset={0}
				className="p-1 w-[210px]"
				style={{ transformOrigin: "top right" }}
			>
				<p className="font-semibold text-[12px] py-3 pl-3 pr-2 inline-flex items-center w-full text-white/70">
					Sort by
				</p>
				<ul className="border-b border-white/10">
					{Object.entries(LIBRARY_SORT).map(([key, value]) => (
						<li key={key} className="text-sm py-2 pl-3 pr-2 hover:bg-[#3e3e3e]">
							<button
								type="button"
								onClick={() => handleOnChangeSort(key as TLibraryStore["sort"])}
								className={cn([
									"flex items-center justify-between w-full",
									sort === key && "text-primary",
								])}
							>
								<p>{value}</p>
								{sort === key && <CheckmarkIcon size={20} />}
							</button>
						</li>
					))}
				</ul>

				<p className="font-semibold text-[11px] py-3 pl-3 pr-2 inline-flex items-center w-full">
					View as
				</p>
				<div className="rounded-md p-1 bg-[#1f1f1f]">
					<ToggleGroup
						type="single"
						value={view}
						onValueChange={handleOnChangeView}
						className="gap-0 w-full"
					>
						{Object.entries(LIBRARY_VIEW).map(([key, value]) => (
							<Tooltip key={key}>
								<TooltipTrigger asChild>
									<ToggleGroupItem
										value={key}
										className={cn([
											"grow rounded-sm bg-transparent",
											"[&_svg]:text-[#b0b0b3]",
											"hover:aria-checked:bg-[#363636] hover:bg-transparent hover:[&_svg]:text-white",
											"aria-checked:bg-[#363636] aria-checked:[&_svg]:text-white",
										])}
									>
										<value.icon size="18px" />
									</ToggleGroupItem>
								</TooltipTrigger>
								<TooltipContent>{value.text}</TooltipContent>
							</Tooltip>
						))}
					</ToggleGroup>
				</div>
			</PopoverContent>
		</Popover>
	);
};
