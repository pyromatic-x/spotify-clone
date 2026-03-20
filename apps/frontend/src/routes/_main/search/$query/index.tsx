import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import type { SEARCH_CATEGORIES } from "@/constants/search";
import { EntitiesRow } from "@/features/entities/row";
import { FooterModule } from "@/features/footer";
import { Tracks } from "@/features/tracks/standalone";
import { useSearch } from "@/hooks/query/use-search";
import { DotsAnimation } from "@/ui/animations/dots";
import { SearchCategories } from "../-components/categories";
import { SearchNoResults } from "../-components/no-results";

export const Route = createFileRoute("/_main/search/$query/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { query } = useParams({ from: "/_main/search/$query/" });

	const { data, isPending } = useSearch({ query });

	if (isPending)
		return (
			<div className="w-full h-full flex items-center justify-center">
				<DotsAnimation />
			</div>
		);

	const isEmpty =
		!data?.albums &&
		!data?.artists &&
		!data?.playlists &&
		!data?.tracks &&
		!data?.users;

	if (isEmpty) return <SearchNoResults />;

	return (
		<div>
			<SearchCategories />

			<div className="mx-auto container px-6 flex flex-col gap-14">
				{data?.tracks && (
					<div className="max-w-[800px] flex flex-col gap-2">
						<Heading category="songs" title="Songs" />
						<Tracks tracks={data.tracks} />
					</div>
				)}
				{data?.artists && (
					<div>
						<Heading category="artists" title="Artists" />
						<EntitiesRow entities={data.artists} scrollable={false} />
					</div>
				)}
				{data?.albums && (
					<div>
						<Heading category="albums" title="Albums" />
						<EntitiesRow entities={data.albums} scrollable={false} />
					</div>
				)}
				{data?.playlists && (
					<div>
						<Heading category="playlists" title="Playlists" />
						<EntitiesRow entities={data.playlists} scrollable={false} />
					</div>
				)}
				{data?.users && (
					<div>
						<Heading category="profiles" title="Profiles" />
						<EntitiesRow entities={data.users} scrollable={false} />
					</div>
				)}
			</div>

			<FooterModule />
		</div>
	);
}

const Heading = ({
	category,
	title,
}: {
	category: (typeof SEARCH_CATEGORIES)[number];
	title: string;
}) => {
	const { query } = useParams({ from: "/_main/search/$query/" });

	return (
		<h2 className="font-bold text-2xl hover:underline text-white">
			<Link to="/search/$query/$category" params={{ query, category }}>
				{title}
			</Link>
		</h2>
	);
};
