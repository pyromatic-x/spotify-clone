import {
	BsArrowsAngleContract as CollapseIcon,
	BsArrowsAngleExpand as ExpandIcon,
} from "react-icons/bs";
import { useUser } from "@/hooks/query/use-user";
import { IconButton } from "@/ui/buttons/icon-button";
import { useLibraryStore } from "../store";

export const LibraryHeaderExpandButton = () => {
	const { size, update } = useLibraryStore();
	const { data: user } = useUser();

	const onClick = () => {
		update({
			payload: {
				size: size === "EXPANDED" ? "DEFAULT" : "EXPANDED",
			},
			user: user!,
		});
	};

	if (size === "COLLAPSED") return null;

	const tooltip =
		size === "DEFAULT" ? "Expand Your Library" : "Minimize Your Library";
	const Icon = size === "EXPANDED" ? CollapseIcon : ExpandIcon;

	return (
		<IconButton
			onClick={onClick}
			className="p-3"
			tooltip={tooltip}
			size="lg"
			variant="circle-on-hover"
		>
			<Icon />
		</IconButton>
	);
};
