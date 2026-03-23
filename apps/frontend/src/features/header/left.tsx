import { useRouter } from "@tanstack/react-router";
import { BsThreeDots as DotsIcon } from "react-icons/bs";
import {
	IoChevronBackOutline as ChevronLeft,
	IoChevronForward as ChevronRight,
} from "react-icons/io5";
import { IconButton } from "@/ui/buttons/icon-button";

export const HeaderLeft = () => {
	const router = useRouter();

	const handleOnBack = () => {
		if (router.history.canGoBack()) router.history.back();
	};
	const handleOnForward = () => {
		router.history.forward();
	};

	return (
		<div className="flex items-center gap-3 pl-6">
			<IconButton size="auto" disabled>
				<DotsIcon className="size-7!" />
			</IconButton>
			<IconButton size="auto" onClick={handleOnBack} tooltip="Go Back">
				<ChevronLeft className="size-7!" />
			</IconButton>
			<IconButton size="auto" onClick={handleOnForward}>
				<ChevronRight className="size-7!" />
			</IconButton>
		</div>
	);
};
