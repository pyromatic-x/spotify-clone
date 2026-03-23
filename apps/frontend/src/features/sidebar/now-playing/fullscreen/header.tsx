import { AiOutlinePlaySquare as CanvasIcon } from "react-icons/ai";
import { BsThreeDots as MenuIcon } from "react-icons/bs";
import { FaCircleDot as ArtworkIcon } from "react-icons/fa6";
import { FiMinimize2 as MinimizeIcon } from "react-icons/fi";
import { GoScreenFull as FullscreenIcon } from "react-icons/go";
import { RiUserHeartLine as ArtistIcon } from "react-icons/ri";
import { useAudiobar } from "@/features/audiobar/audiobar-store";
import { cn } from "@/lib/utils";
import { IconButton } from "@/ui/buttons/icon-button";
import { useSidebarStore } from "../../store";
import { useFullscreenStore } from "../store";

interface TProps {
	onResetScroll: (delay?: number) => void;
}

export const NowPlayingFullscreenHeader = ({ onResetScroll }: TProps) => {
	const source = useAudiobar((state) => state.source);
	const track = useAudiobar((state) => state.track);

	const toggle = useSidebarStore((state) => state.toggle);
	const scroll = useSidebarStore((state) => state.scroll);

	const image = useFullscreenStore((state) => state.image);
	const update = useFullscreenStore((state) => state.update);

	const handleOnClose = () => {
		toggle(2, "now-playing-fullscreen");
		onResetScroll();
	};

	const handleOnChangeImage = (payload: typeof image) => {
		if (payload === image) return;

		update({ image: payload });
		onResetScroll(0);
	};

	return (
		<div
			className={cn([
				"flex items-center justify-between sticky top-0 py-4 pr-4 pl-6 z-5",
				"after:-z-1 after:transition-opacity after:duration-400 after:absolute after:h-[120px] after:inset-0 after:pointer-events-none after:bg-[linear-gradient(0deg,transparent,rgba(0,0,0,.01)_7%,rgba(0,0,0,.04)_15%,rgba(0,0,0,.09)_25%,rgba(0,0,0,.16)_35%,rgba(0,0,0,.26)_45%,rgba(0,0,0,.38)_55%,rgba(0,0,0,.51)_65%,rgba(0,0,0,.64)_75%,rgba(0,0,0,.75)_85%,rgba(0,0,0,.85))]",
				scroll > 0 ? "after:opacity-100" : "after:opacity-0",
			])}
		>
			<p className="font-bold">{source?.name}</p>

			<div className="flex items-center gap-4 [&_button]:p-2 [&_button]:size-8 [&_button]:hover:bg-black/20">
				<IconButton
					tooltip="Show artwork"
					variant="circle-on-hover"
					onClick={() => handleOnChangeImage("artwork")}
					className={cn([
						"relative",
						image === "artwork" &&
							"after:absolute after:bottom-0 after:w-1 after:h-1 after:rounded-full after:bg-white",
					])}
				>
					<ArtworkIcon />
				</IconButton>
				<IconButton tooltip="Show artwork" variant="circle-on-hover" disabled>
					<CanvasIcon />
				</IconButton>
				<IconButton
					tooltip="Show artist image"
					variant="circle-on-hover"
					onClick={() => handleOnChangeImage("artist")}
					className={cn([
						"relative",
						image === "artist" &&
							"after:absolute after:bottom-0 after:w-1 after:h-1 after:rounded-full after:bg-white",
					])}
				>
					<ArtistIcon />
				</IconButton>

				<div className="h-[22px] w-0.5 bg-white/20" />

				<IconButton
					tooltip={`More options for ${track?.name}`}
					disabled
					variant="circle-on-hover"
				>
					<MenuIcon />
				</IconButton>
				<IconButton tooltip="Enter Full screen" variant="circle-on-hover">
					<FullscreenIcon />
				</IconButton>
				<IconButton
					tooltip="Minimize Now Playing view"
					variant="circle-on-hover"
					onClick={handleOnClose}
				>
					<MinimizeIcon />
				</IconButton>
			</div>
		</div>
	);
};
