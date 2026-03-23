import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { EntitiesGrid } from "@/features/entities/grid";
import { usePersonalCategories } from "@/hooks/query/use-personal-category";
import { useDocumentTitle } from "@/hooks/use-document-title";

export const Route = createFileRoute("/_main/category/$type")({
	component: RouteComponent,
});

function RouteComponent() {
	const { type } = useParams({ from: "/_main/category/$type" });

	const { data } = usePersonalCategories(type);

	const title = useDocumentTitle();

	useEffect(() => {
		if (data?.title) title.set(data.title);
	}, [data?.title, title]);

	if (!data) return;

	return (
		<div className="my-16 px-4">
			<div className="container">
				<h1 className="text-[32px] font-bold text-white mb-5">{data.title}</h1>
				<EntitiesGrid entities={data.entities} />
			</div>
		</div>
	);
}
