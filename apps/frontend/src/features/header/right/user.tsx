import {
	type CreateLinkProps,
	createLink,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RiExternalLinkLine } from "react-icons/ri";
import { useLogoutMutation } from "@/hooks/mutations/use-logout-mutatation";
import { useUser } from "@/hooks/query/use-user";
import { queryClient } from "@/lib/query-client";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";

export const HeaderRightUser = () => {
	const { data: user } = useUser();
	const navigate = useNavigate();
	const router = useRouter();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const logout = useLogoutMutation({
		onSuccess: () => {
			navigate({ to: "/login" });
			queryClient.removeQueries();
		},
	});

	useEffect(() => {
		const unsubscribe = router.subscribe("onBeforeNavigate", () => {
			setIsMenuOpen(false);
		});

		return () => unsubscribe();
	}, [router]);

	return (
		user && (
			<Tooltip>
				<TooltipTrigger asChild>
					<Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
						<PopoverTrigger asChild>
							<button
								type="button"
								className="rounded-full p-2 w-12 h-12 bg-[#1f1f1f] cursor-pointer hover:scale-103"
							>
								<img
									src={`${user?.picture_url}?w=64&h=64`}
									alt={user?.name}
									className="w-full h-full object-cover rounded-full"
								/>
							</button>
						</PopoverTrigger>
						<PopoverContent className="p-1 min-w-[320px]">
							<DropdownLink to="/" title="Account" external />
							<DropdownLink
								to="/user/$id"
								params={{ id: user._id }}
								title="Profile"
							/>
							<DropdownLink to="/" title="Upgrade to Premium" external />
							<DropdownLink to="/" title="Support" external />
							<DropdownLink to="/" title="Download" external />
							<DropdownLink to="/settings" title="Settings" />
							<hr className="border-[#ffffff1a]" />
							<button
								type="button"
								className="w-full px-3 py-2 flex items-center justify-between text-sm text-white cursor-pointer hover:bg-white/10"
								onClick={() => {
									setIsMenuOpen(false);
									logout.mutate();
								}}
							>
								Log out
							</button>
						</PopoverContent>
					</Popover>
				</TooltipTrigger>
				<TooltipContent>{user.name}</TooltipContent>
			</Tooltip>
		)
	);
};

const DropdownLink = createLink(
	({
		title,
		external,
		...rest
	}: {
		title: string;
		external?: boolean;
	} & CreateLinkProps) => {
		return (
			<a
				{...rest}
				className="w-full px-3 py-2 flex items-center justify-between text-sm text-white hover:underline hover:bg-white/10"
			>
				<span>{title}</span>
				{external && <RiExternalLinkLine size={20} />}
			</a>
		);
	},
);
