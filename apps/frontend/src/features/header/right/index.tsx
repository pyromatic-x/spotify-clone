import { useLocation, useNavigate } from "@tanstack/react-router";
import { FaRegBell as BellInactiveIcon } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { IconButton } from "@/ui/buttons/icon-button";
import { HeaderRightFriendActivity } from "./friend-activity";
import { HeaderRightUser } from "./user";

export const HeaderRight = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const FeedIcon = location.pathname === "/feed" ? FaBell : BellInactiveIcon;

	return (
		<div className="flex items-center gap-2 place-content-end">
			<IconButton
				tooltip="What's New"
				onClick={() => navigate({ to: "/feed" })}
			>
				<FeedIcon size="18px" />
			</IconButton>

			<HeaderRightFriendActivity />
			<HeaderRightUser />
		</div>
	);
};
