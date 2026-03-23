import { type RefObject, useRef, useState } from "react";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { IoCloseOutline as ClearIcon } from "react-icons/io5";
import { useOnClickOutside } from "usehooks-ts";
import { IconButton } from "@/ui/buttons/icon-button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/ui/form/input-group";
import { useLibraryStore } from "./store";

export const LibraryHeaderSearch = () => {
	const { size, search, update } = useLibraryStore();
	const [isExpanded, setIsExpanded] = useState(false);

	const ref = useRef<HTMLInputElement>(null);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		update({ payload: { search: e.target.value } });
	};

	const handleOnClear = () => {
		update({ payload: { search: "" } });
	};

	useOnClickOutside(ref as RefObject<HTMLElement>, () => {
		setIsExpanded(false);
	});

	return (
		<div>
			{!isExpanded && size !== "EXPANDED" ? (
				<IconButton
					tooltip="Search in Your Library"
					variant="circle-on-hover"
					onClick={() => setIsExpanded(true)}
				>
					<SearchIcon size={20} />
				</IconButton>
			) : (
				<InputGroup
					className="h-8 border-none bg-[#2a2a2a] max-w-[210px]"
					ref={ref}
				>
					<InputGroupAddon className="px-2">
						<SearchIcon size={20} />
					</InputGroupAddon>

					<InputGroupInput
						placeholder="Search in Your Library"
						className="h-8 min-h-auto focus:bg-transparent px-0"
						value={search}
						onChange={handleOnChange}
					/>

					{search && (
						<InputGroupAddon
							align="inline-end"
							onClick={handleOnClear}
							className="cursor-pointer px-2"
						>
							<ClearIcon size={20} />
						</InputGroupAddon>
					)}
				</InputGroup>
			)}
		</div>
	);
};
