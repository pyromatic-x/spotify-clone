import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { HiOutlineUsers as FriendInactiveIcon } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { getOS } from "@/lib/navigator";
import { IconButton } from "@/ui/buttons/icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

export const HeaderRightFriendActivity = () => {
	const [isActivityOpen, setIsActivityOpen] = useState(false);

	return (
		<Popover open={isActivityOpen} onOpenChange={setIsActivityOpen}>
			<PopoverTrigger asChild>
				<IconButton tooltip="Friend Activity">
					<FriendInactiveIcon size="18px" />
				</IconButton>
			</PopoverTrigger>
			<PopoverContent
				className="max-w-[260px]"
				side="bottom"
				sideOffset={4}
				alignOffset={-4}
				align="end"
			>
				<div className="w-full flex justify-end">
					<IconButton size="xl" onClick={() => setIsActivityOpen(false)}>
						<IoCloseOutline />
					</IconButton>
				</div>
				<div className="px-6 pb-6 text-white flex flex-col gap-5 text-center">
					<p className="text-2xl font-bold">
						Check what friends are playing with the {getOS()} app
					</p>
					<p className="text-[#b3b3b3]">
						Explore the tracks your friends are spinning and get inspired for
						your next play.
					</p>
					<Link to="." className="hover:underline text-sm">
						Download directly from Spotify
					</Link>
				</div>
			</PopoverContent>
		</Popover>
	);
};
