import { type ComponentProps, useState } from "react";
import { FaCheck as CheckIcon, FaPlus as PlusIcon } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { IconButton } from "./icon-button";

type TSizes = "sm" | "md" | "lg";

interface TProps {
	_id: string;
	size?: TSizes;
	defaultValue?: boolean;
	className?: ComponentProps<"button">["className"];
}

const sizes: Record<TSizes, string> = {
	sm: "h-4 w-4 [&_svg]",
	md: "h-6 w-6 [&_svg]:w-4 [&_svg]:h-4",
	lg: "h-7 w-7 [&_svg]:w-4 [&_svg]:h-4",
};

export const LikeButton = ({
	size = "md",
	defaultValue = false,
	className,
}: TProps) => {
	const [isLiked, setIsLiked] = useState(defaultValue);

	const handleOnClick = (e: React.UIEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		setIsLiked((state) => !state);
	};

	const tooltip = isLiked ? "Add to playlist" : "Add to Liked Songs";
	const Icon = isLiked ? CheckIcon : PlusIcon;

	return (
		<IconButton
			tooltip={tooltip}
			onClick={handleOnClick}
			size="auto"
			className={cn([
				"cusr flex items-center justify-center rounded-full border-2 transition-all duration-400",
				isLiked
					? "border-primary bg-primary"
					: "border-[initial] bg-transparent ",
				sizes[size],
				className,
			])}
		>
			<Icon className={isLiked ? "fill-black" : "fill-[#b3b3b3]"} />
		</IconButton>
	);
};
