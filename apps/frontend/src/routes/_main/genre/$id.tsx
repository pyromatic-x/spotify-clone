import { createFileRoute } from "@tanstack/react-router";
import tinycolor from "tinycolor2";
import { calcPageHeadingSize } from "@/features/entities/page/utils";
import { EntitiesRow } from "@/features/entities/row";
import { useMainStore } from "@/features/main/store";
import { useGenre } from "@/hooks/query/use-genre";

export const Route = createFileRoute("/_main/genre/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data } = useGenre(id);

	const width = useMainStore((s) => s.width);

	if (!data) return;

	const base = tinycolor(data.color).darken(10).toHexString();
	const highlight = tinycolor(data.color).brighten(10).toHexString();
	const gradient = tinycolor(base).darken(7).toHexString();

	return (
		<div className="mb-6">
			<div
				className="relative h-[min(30vh,clamp(186px,186px+(100cqw-600px)/424*150,336px))] mb-20"
				style={{
					backgroundColor: base,
					backgroundImage: `linear-gradient(in oklch to bottom, ${highlight}, transparent), none`,
				}}
			>
				<div
					className="absolute bottom-[-180px] h-[180px] w-full -z-1"
					style={{
						backgroundImage: `linear-gradient(in oklch to bottom, ${gradient}, transparent), none`,
					}}
				/>
				<div className="container p-6 w-full h-full flex items-end gap-6">
					<div className="flex flex-col">
						<h1
							className="text-white font-bold"
							style={{
								fontSize: calcPageHeadingSize({ text: data.title, width }),
							}}
						>
							{data.title}
						</h1>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-6">
				<div className="flex flex-col gap-8">
					{data.items.map((t) => (
						<EntitiesRow
							key={t.title}
							scrollable={false}
							title={t.title}
							entities={t.entities}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
