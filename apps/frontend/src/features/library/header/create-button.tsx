import { HiOutlinePlus as PlusIcon } from "react-icons/hi2";
import { Button } from "@/ui/buttons/button";
import { IconButton } from "@/ui/buttons/icon-button";

interface TProps {
	variant: "icon" | "full";
}

export const LibraryHeaderCreateButton = ({ variant }: TProps) => {
	const tooltip = "Create a playlist, folder, or Jam";

	if (variant === "icon")
		return (
			<IconButton tooltip={tooltip} variant="circle">
				<PlusIcon size="20px" />
			</IconButton>
		);

	return (
		<Button variant="filled" size="wide" tooltip={tooltip}>
			<PlusIcon size="20px" /> Create
		</Button>
	);
};
