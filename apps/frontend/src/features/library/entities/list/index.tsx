import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import type { TLibraryEntity } from "@/lib/api/schemas/library";
import { cn } from "@/lib/utils";
import { useLibraryStore } from "../../store";
import { LibraryEntitiesCompactListItem } from "./compact-item";
import { LibraryEntitiesDefaultListItem } from "./default-item";

export const LibraryEntitiesList = () => {
	const { entities, view, size } = useLibraryStore();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const checkIsOnPage = (entity: TLibraryEntity) => {
		const path = `/${entity.entity_type}/${entity.entity._id}`;
		return pathname.startsWith(path);
	};

	return (
		<ul>
			{entities.map((t) => (
				<li
					key={t._id}
					data-opened={checkIsOnPage(t)}
					className={cn([
						"px-2 py-1 rounded-sm relative",
						"hover:bg-[#1f1f1f]",
						"data-[opened=true]:bg-[#2a2a2a] hover:data-[opened=true]:bg-[#484848]",
						size === "EXPANDED"
							? "grid grid-cols-[1fr_20%_20%]"
							: "flex justify-between items-center",
					])}
				>
					{view === "compact-list" ? (
						<LibraryEntitiesCompactListItem key={t._id} {...t} />
					) : (
						<LibraryEntitiesDefaultListItem key={t._id} {...t} />
					)}

					{size === "EXPANDED" && (
						<>
							<Timestamp date={t.added_at} />
							<Timestamp date={t.last_played_at} end />
						</>
					)}
					<button
						type="button"
						onClick={() =>
							navigate({ to: `/${t.entity_type}/${t.entity._id}` })
						}
						className="w-full h-full absolute top-0 left-0 z-1 cursor-pointer"
					/>
				</li>
			))}
		</ul>
	);
};

const Timestamp = ({ date, end }: { date: string; end?: boolean }) =>
	date ? (
		<p
			className={cn([
				"text-[#b0b0b0] text-sm inline-flex items-center",
				end ? "justify-end" : "text-start",
			])}
		>
			{dayjs(date).format("MMM D, YYYY")}
		</p>
	) : null;
