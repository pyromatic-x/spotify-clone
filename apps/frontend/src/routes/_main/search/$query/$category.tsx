import { createFileRoute, useParams } from "@tanstack/react-router";
import { SearchCategories } from "../-components/categories";

export const Route = createFileRoute("/_main/search/$query/$category")({
	component: RouteComponent,
});

function RouteComponent() {
	const { query, category } = useParams({
		from: "/_main/search/$query/$category",
	});
	return (
		<>
			<SearchCategories />
			{query} {category}
		</>
	);
}
