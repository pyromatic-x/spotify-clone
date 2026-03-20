import { Link } from "@tanstack/react-router";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { IoWifiSharp } from "react-icons/io5";
import type { IconType } from "react-icons/lib";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { PiDevices } from "react-icons/pi";
import { RiExternalLinkLine } from "react-icons/ri";
import { SIDEBAR_SIZES } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { Scrollable } from "@/ui/scrollable";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { useSidebarStore } from "../store";
import { SidebarDevicesHeader } from "./header";

export const SidebarDevices = () => {
	const layers = useSidebarStore((store) => store.layers);
	const onScroll = useSidebarStore((store) => store.onScroll);

	const open = layers[1] === "devices";

	return (
		<div
			className={cn(
				"overflow-hidden w-full h-full absolute top-0 left-0",
				!layers[1] && "transition-all duration-300",
				!open && "translate-y-[200px] opacity-0",
			)}
			style={{ minWidth: `${SIDEBAR_SIZES.OPENED}px` }}
		>
			<SidebarDevicesHeader />

			<Scrollable
				className={cn([
					"bg-[#121212] w-full h-full translate-y-0 p-4 gap-4 pb-20",
					"**:data-overlayscrollbars-contents:flex **:data-overlayscrollbars-contents:flex-col **:data-overlayscrollbars-contents:justify-between",
				])}
				onScroll={onScroll}
			>
				<div>
					<div className="h-16 px-5 py-4 text-primary bg-[#1f1f1f] rounded-[8px] flex items-center gap-3 w-[calc(100%+16px)] relative -left-2">
						<HiMiniComputerDesktop size={22} />
						This web browser
					</div>
					<p className="font-bold mt-5 mb-3">No other devices found</p>
					<Row
						title="Check your WiFi"
						subtitle="Connect the devices you’re using to the same WiFi."
						Icon={IoWifiSharp}
					/>
					<Row
						title="Play from another device"
						subtitle="It will automatically appear here."
						Icon={PiDevices}
					/>
					<Row
						title="Switch to the Spotify app"
						subtitle="The app can detect more devices."
						tooltip="Switch to the Spotify app"
						Icon={MdOutlineDownloadForOffline}
						link="/download"
					/>
				</div>
				<div>
					<ExternalLink title="Don't see your device?" />
					<ExternalLink title="What can I connect to?" />
				</div>
			</Scrollable>
		</div>
	);
};

interface TRowProps {
	title: string;
	subtitle: string;
	Icon: IconType;
	link?: string;
	tooltip?: string;
}

const Row = ({ link, title, subtitle, tooltip, Icon }: TRowProps) => {
	const Comp = link ? Link : "div";

	return (
		<Tooltip delayDuration={600}>
			<TooltipTrigger asChild>
				<Comp
					to={link}
					className={cn([
						"px-5 py-4 rounded-[8px] text-[#b3b3b3] flex items-center gap-3 w-[calc(100%+16px)] relative -left-2",
						link && "hover:bg-[#1f1f1f]",
					])}
				>
					<Icon size={26} />
					<div>
						<p className="text-white">{title}</p>
						<p className="text-sm">{subtitle}</p>
					</div>
				</Comp>
			</TooltipTrigger>
			{tooltip && <TooltipContent>{tooltip}</TooltipContent>}
		</Tooltip>
	);
};

const ExternalLink = ({ title }: { title: string }) => (
	<Link
		to="."
		className="flex items-center justify-between h-14 rounded-[6px] hover:bg-[#1f1f1f] hover:underline w-[calc(100%+16px)] relative -left-2 px-3 py-2 text-white"
	>
		<span>{title}</span>
		<RiExternalLinkLine className="fill-white/60" size={20} />
	</Link>
);
