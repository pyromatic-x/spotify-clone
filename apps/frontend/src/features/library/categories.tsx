import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { useUser } from "@/hooks/query/use-user";
import { cn } from "@/lib/utils";
import { IconButton } from "@/ui/buttons/icon-button";
import { ToggleGroup, ToggleGroupItem } from "@/ui/form/toggle-group";
import { type TLibraryStore, useLibraryStore } from "./store";

export const LibraryCategories = () => {
	const { category, update } = useLibraryStore();
	const { data: user } = useUser();

	const handleOnChange = (payload: TLibraryStore["category"]) => {
		update({
			payload: { category: payload ?? "" },
			user: user!,
		});
	};

	return (
		<div className="flex items-center gap-[7px]">
			{category && (
				<IconButton variant="circle" onClick={() => handleOnChange("")}>
					<CloseIcon size="18px" />
				</IconButton>
			)}
			<ToggleGroup
				type="single"
				value={category}
				onValueChange={handleOnChange}
			>
				{(!category || category.includes("playlist")) && (
					<>
						<ToggleGroupItem
							value="playlist"
							aria-checked={category.includes("playlist")}
							className="z-1"
						>
							Playlists
						</ToggleGroupItem>
						{category.includes("playlist") && (
							<div className="flex gap-2">
								<SubCategoryButton
									value="playlist-by-user"
									active={category === "playlist-by-user"}
									hidden={category === "playlist-by-spotify"}
									title="By you"
									onClick={handleOnChange}
								/>
								<SubCategoryButton
									value="playlist-by-spotify"
									active={category === "playlist-by-spotify"}
									hidden={category === "playlist-by-user"}
									title="By Spotify"
									onClick={handleOnChange}
								/>
							</div>
						)}
					</>
				)}
				{(!category || category === "album") && (
					<ToggleGroupItem value="album">Albums</ToggleGroupItem>
				)}
				{(!category || category === "artist") && (
					<ToggleGroupItem value="artist">Artists</ToggleGroupItem>
				)}
			</ToggleGroup>
		</div>
	);
};

const SubCategoryButton = ({
	value,
	active,
	hidden,
	title,
	onClick,
}: {
	value: TLibraryStore["category"];
	active: boolean;
	hidden: boolean;
	title: string;
	onClick: (payload: TLibraryStore["category"]) => void;
}) => {
	if (hidden) return;

	return (
		<button
			type="button"
			value={value}
			onClick={() => onClick(value)}
			className={cn([
				"flex gap-[7px] relative rounded-full cursor-pointer py-1 px-3 text-sm h-8 font-normal bg-white/10 items-center justify-center",
				active && "pl-8 left-[-34px] bg-white/85 text-black",
			])}
		>
			{title}
		</button>
	);
};
