import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { IconButton } from "@/ui/buttons/icon-button";
import { useSidebarStore } from "../store";

export const SidebarQueueHeader = () => {
	const scroll = useSidebarStore((state) => state.scroll);
	const toggle = useSidebarStore((state) => state.toggle);

	return (
		<div
			className={cn(
				"h-16 w-full flex items-center relative z-1 bg-[#121212] top-0 overflow-hidden",
				scroll > 0 && "shadow-md shadow-black/30",
			)}
		>
			<div className="px-4 flex w-full items-center justify-between">
				<p className="font-bold">Queue</p>
				<IconButton
					variant="circle-on-hover"
					tooltip="Close"
					onClick={() => toggle(1, "queue")}
				>
					<CloseIcon />
				</IconButton>
			</div>
		</div>
	);
};
