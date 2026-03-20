import { useLocation, useNavigate } from "@tanstack/react-router";
import { TiPin as PinIcon } from "react-icons/ti";
import type { TLibraryEntity } from "@/lib/api/schemas/library";
import { cn } from "@/lib/utils";
import { PlayButton } from "@/ui/buttons/play-button";
import { useLibraryStore } from "../../store";
import { getLibraryEntityDescription } from "../utils";

export function LibraryEntitiesDefaultGridItem({
	entity,
}: {
	entity: TLibraryEntity;
}) {
	const {
		entity_type,
		pinned_at,
		entity: { _id, picture_url, name },
	} = entity;

	const { category } = useLibraryStore();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const { title, subtitle } = getLibraryEntityDescription({
		category,
		entity,
	});

	const isOpened = pathname.startsWith(`/${entity.entity_type}/${_id}`);

	return (
		<div
			className="group relative flex flex-col gap-2 p-2 hover:bg-[#1f1f1f] rounded-[6px] data-[opened=true]:bg-[#2a2a2a] hover:data-[opened=true]:bg-[#484848]"
			data-opened={isOpened}
		>
			<div className="relative ">
				<img
					src={`${picture_url}?w=350&h=350`}
					alt={name}
					className={cn([
						"w-full h-auto object-cover shadow-md shadow-black/40",
						entity_type === "artist" ? "rounded-full" : "rounded-[6px]",
					])}
				/>
				<div className="absolute right-1.5 -bottom-1.5 opacity-0 group-hover:opacity-100 group-hover:bottom-1.5 transition-all">
					<PlayButton entity_id={_id} entity={entity_type} />
				</div>
			</div>
			<div className="flex flex-col">
				<p className="line-clamp-1">{name}</p>
				<p className="inline-flex items-center gap-1.5 text-[#b0b0b0] text-sm line-clamp-1 whitespace-nowrap">
					{pinned_at && <PinIcon className="text-primary block min-w-3.5" />}{" "}
					{title && (
						<span className="inline-flex gap-1.5 items-center text-sm text-[#b0b0b0]">
							{title}{" "}
							{subtitle && (
								<>
									<span className="block w-1 h-1 rounded-full bg-[#b0b0b0]" />
									{subtitle}
								</>
							)}
						</span>
					)}
				</p>
			</div>
			<button
				type="button"
				onClick={() =>
					navigate({ to: `/${entity.entity_type}/${entity.entity._id}` })
				}
				className="w-full h-full absolute top-0 left-0 z-1 cursor-pointer"
			/>
		</div>
	);
}
