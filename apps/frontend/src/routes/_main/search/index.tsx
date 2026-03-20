import { createFileRoute, Link } from "@tanstack/react-router";
import { useGenres } from "@/hooks/query/use-genres";
import type { TGenre } from "@/lib/api/schemas/genre";
import { createArrayWithRandoms } from "@/lib/array";
import { Skeleton } from "@/ui/skeleton";

export const Route = createFileRoute("/_main/search/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: genres, isPending } = useGenres();

	return (
		<div className="relative pt-13">
			<div className="container mx-auto px-6">
				<h2 className="text-2xl font-bold mb-4">Browse all</h2>
				<div
					className="grid gap-6"
					style={{
						gridAutoRows: "min-content",
						gridTemplateColumns: `repeat(auto-fill,minmax(300px, 1fr))`,
					}}
				>
					{isPending
						? createArrayWithRandoms(30).map((t) => <PendingCard key={t} />)
						: genres?.map((genre) => <Card key={genre._id} {...genre} />)}
				</div>
			</div>
		</div>
	);
}

const Card = ({ _id, color, title, picture_url }: TGenre) => (
	<Link
		className="rounded-[8px] w-full h-full pb-[56%] shadow-xs relative overflow-hidden"
		style={{ background: color }}
		to="/genre/$id"
		params={{ id: _id }}
	>
		<p className="absolute top-4 left-4 text-2xl font-bold text-white">
			{title}
		</p>
		<img
			src={picture_url}
			alt={title}
			className="w-[45%] absolute bottom-0 right-0 rounded-[4px] shadow-xl rotate-25 translate-x-[14%] translate-y-[10%]"
		/>
	</Link>
);

const PendingCard = () => (
	<Skeleton className="rounded-[8px] w-full h-full pb-[56%] shadow-xs relative overflow-hidden" />
);
