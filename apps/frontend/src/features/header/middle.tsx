import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaRegFolderOpen as BrowseIconOutlined } from "react-icons/fa";
import { FaRegFolderOpen as BrowseIconFilled } from "react-icons/fa6";
import { FiSearch as SearchIcon } from "react-icons/fi";
import {
	RiCloseLargeLine as ClearIcon,
	RiHome5Fill as HomeIconFilled,
	RiHome5Line as HomeIconOutlined,
} from "react-icons/ri";
import { useDebounceCallback } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { IconButton } from "@/ui/buttons/icon-button";
import { Input } from "@/ui/form/input";

export const HeaderMiddle = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const params = useParams({
		from: "/_main/search/$query/",
		shouldThrow: false,
	});

	const [value, setValue] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const ref = useRef<HTMLInputElement>(null);

	const HomeIcon =
		location.pathname === "/" ? HomeIconFilled : HomeIconOutlined;
	const BrowseIcon =
		location.pathname === "/search" ? BrowseIconFilled : BrowseIconOutlined;

	const handleOnFocus = () => {
		setIsFocused(true);
		ref.current?.focus();
	};

	const navigateOnSearch = useCallback(
		(val: string) => {
			navigate({ to: "/search/$query", params: { query: val } });
		},
		[navigate],
	);
	const navigateDebounced = useDebounceCallback(navigateOnSearch, 500);

	const handleOnSearch = useCallback(
		(val: string) => {
			setValue(val);
			navigateDebounced(val);
		},
		[navigateDebounced],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: exhaustive
	useEffect(() => {
		if (location.pathname.includes("search") && !value && params?.query) {
			setValue(params.query);
		}
	}, []);

	useEffect(() => {
		if (!location.pathname.includes("search") && value && !isFocused) {
			setValue("");
		}
	}, [location.pathname, value, isFocused]);

	return (
		<div className="flex items-center gap-2">
			<IconButton
				size="xl"
				variant="circle"
				onClick={() => navigate({ to: "/" })}
				tooltip="Home"
			>
				<HomeIcon
					size="30px"
					color={location.pathname === "/" ? "white" : "secondary"}
				/>
			</IconButton>

			<div
				className={cn([
					"h-12 rounded-full overflow-hidden w-full flex items-center px-3 gap-3 bg-[#1f1f1f] outline-2  outline-transparent transition-all",
					"border border-transparent hover:bg-[#2a2a2a] hover:border-white/30",
					isFocused && " outline-white",
				])}
			>
				<IconButton size="auto" onClick={handleOnFocus} tooltip="Search">
					<SearchIcon className="size-6!" />
				</IconButton>

				<Input
					ref={ref}
					placeholder="What do you want to play?"
					wrapperClassName="w-full"
					className="min-h-auto w-full bg-transparent focus:bg-transparent px-0"
					value={value}
					onChange={(event) => handleOnSearch(event.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>

				{value && (
					<IconButton
						size="auto"
						onClick={() => {
							setValue("");
							navigate({ to: "/search" });
						}}
						tooltip="Clear search field"
					>
						<ClearIcon className="size-6!" />
					</IconButton>
				)}

				<div className="h-[60%] w-px bg-white/10" />

				<IconButton
					size="auto"
					tooltip="Browse"
					onClick={() => {
						setValue("");
						navigate({ to: "/search" });
					}}
				>
					<BrowseIcon className="size-6!" />
				</IconButton>
			</div>
		</div>
	);
};
