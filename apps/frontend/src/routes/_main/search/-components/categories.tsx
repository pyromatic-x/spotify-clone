import { useNavigate, useParams } from "@tanstack/react-router";
import type { SEARCH_CATEGORIES } from "@/constants/search";
import { capitalizeFirstLetter } from "@/lib/strings";
import type { FileRouteTypes } from "@/routeTree.gen";
import { Button } from "@/ui/buttons/button";

const categories: Array<{
	category: (typeof SEARCH_CATEGORIES)[number];
	to: FileRouteTypes["to"];
	disabled?: boolean;
}> = [
	{ category: "all", to: "/search/$query" },
	{ category: "songs", to: "/search/$query/$category" },
	{ category: "artists", to: "/search/$query/$category" },
	{ category: "albums", to: "/search/$query/$category" },
	{ category: "profiles", to: "/search/$query/$category" },
	{ category: "playlists", to: "/search/$query/$category" },
	{ category: "podcasts", to: "/search/$query/$category", disabled: true },
];

export const SearchCategories = () => {
	const navigate = useNavigate();

	const params = useParams({
		from: "/_main/search/$query/$category",
		shouldThrow: false,
	});
	const activeCategory = params?.category || categories[0].category;

	return (
		<div className="max-w-6xl mx-auto flex gap-2 px-6 py-4">
			{categories.map(({ category, disabled, to }) => (
				<Button
					key={category}
					disabled={disabled}
					variant={activeCategory === category ? "white" : "filled"}
					onClick={() => navigate({ to, params: { category } })}
				>
					{capitalizeFirstLetter(category)}
				</Button>
			))}
		</div>
	);
};
