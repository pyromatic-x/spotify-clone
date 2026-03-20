import { FeaturedEntityCard } from "@/features/entities/cards/featured-entity-card";
import { EntitiesRow } from "@/features/entities/row";
import { useMainStore } from "@/features/main/store";
import { usePersonal } from "@/hooks/query/use-personal";
import { cn } from "@/lib/utils";

export const HomePageContent = () => {
	const { data } = usePersonal();
	const width = useMainStore((s) => s.width);

	const [featured, ...rest] = data || [];

	return (
		<div className="container relative z-1 px-10">
			<div
				className={cn(
					["grid gap-3 mb-12"],
					width > 780 ? "grid-cols-4" : "grid-cols-2",
				)}
			>
				{featured.entities.map((t) => (
					<FeaturedEntityCard key={t._id} {...t} />
				))}
			</div>

			<div className="flex flex-col gap-8">
				{rest.map((t) => (
					<EntitiesRow
						key={t.category}
						title={t.title as string}
						subtitle={t.subtitle}
						entities={t.entities}
						link={`/category/${t.category}`}
						scrollable
					/>
				))}
			</div>
		</div>
	);
};
