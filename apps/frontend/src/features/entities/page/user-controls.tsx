import { useNavigate } from "@tanstack/react-router";
import { BsThreeDots } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useUserPage } from "@/hooks/query/use-user-page";
import { FollowButton } from "@/ui/buttons/follow-button";
import { IconButton } from "@/ui/buttons/icon-button";

export const UserPageControls = () => {
	const { data: user } = useUserPage();
	const navigate = useNavigate();

	if (!user) return;

	return (
		<div className="flex gap-6">
			{user.is_owner ? (
				<IconButton
					tooltip="Go to settings"
					onClick={() => navigate({ to: "/settings" })}
					size="auto"
					className="size-7"
				>
					<IoSettingsOutline />
				</IconButton>
			) : (
				<FollowButton _id={user._id} entity="user" />
			)}
			<IconButton
				tooltip={`More options for ${user.name}`}
				size="auto"
				className="size-7"
			>
				<BsThreeDots />
			</IconButton>
		</div>
	);
};
